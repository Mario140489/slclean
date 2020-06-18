import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {
  rootURL: string;

  constructor(private http:HttpClient, @Inject('BASE_URL')baseUrl:string) {
    this.rootURL= baseUrl;
   }

   getservicos(){
     return this.http.get("https://syss-26205.firebaseio.com/crm_servico.json");
   }
   newservico(data){
     return this.http.post("https://syss-26205.firebaseio.com/crm_servico.json",data).pipe();
   }
   deletarservico(data){
    return this.http.delete('https://syss-26205.firebaseio.com/crm_servico/'+data+'.json').pipe();
   }
   updateservico(id,data){
     return this.http.put('https://syss-26205.firebaseio.com/crm_servico/'+id+'.json',data).pipe();
   }
}
