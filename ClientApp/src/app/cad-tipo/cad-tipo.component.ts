import { servicos } from '../Classes/servicos';
import { Component, OnInit } from '@angular/core';
import {ServicosService} from '../services/servicos.service';
import { Subject } from 'rxjs';
import { uteis } from '../Utils/uteis';

var util = new uteis();
@Component({
  selector: 'app-cad-servicos',
  templateUrl: './cad-tipo.component.html',
  styleUrls: ['./cad-tipo.component.css']
})


export class CadTipoComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dataservico = [];
  dtTrigger: Subject<any> = new Subject();
  titulomodal = "";
  private servico: servicos = new servicos();
  MsgPrincipal:string ="Error! ";
  MsgDescritiva:string="Atenção não foi possivel cadastrar esse servico";
  error:boolean = false;
  constructor( private service: ServicosService) { }

  ngOnInit(): void {
    this.getservicos();
    this.dtOptions = {
      pagingType: 'full_numbers',
      paging: true
    };

  }
  teste(vl:any){
    debugger;
   let valor = vl;
   valor = valor.replace(',',".")
   valor = parseFloat(valor)
   return valor
  }
   salvar(){
    if(!this.servico.id){
       this.service.newservico(this.servico).toPromise().then( result =>{

          this.getservicos();

       }).catch(result =>{
         this.error = true;
       }

       );
    }
    else{
      let id = this.servico.id;
      let data={
        descricao: this.servico.descricao,
        valor: this.servico.valor
      }
      this.service.updateservico(id,data).toPromise().then(result =>{
        this.getservicos();
      })
    }
   }
  getservicos(){
    this.dataservico =[];
    this.service.getservicos().subscribe((result:any) =>{
      let chaves = Object.keys(result);
      for( let i = 0 ; i < chaves.length ; i++){
       let dtjson={};
       dtjson['id_servico'] = chaves[i];
       dtjson['ds_descricao'] =  result[chaves[i]]['descricao'];
       dtjson['ds_valor']= util.transformareais(result[chaves[i]]['valor']);
       this.dataservico.push(dtjson);
      }

      this.dtTrigger.next();
    })
  }
  deletar(id){
    debugger;
    this.service.deletarservico(id).toPromise().then(result =>{
      this.getservicos();
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
