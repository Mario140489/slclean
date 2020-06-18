import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../Classes/Usuario';
import { Router } from '@angular/router';
import { LoginService } from './login.service';


@Injectable()
export class AuthService {

  Menu = new EventEmitter<boolean>();
  private usuarioAutenticado:boolean = false;


  constructor(private router: Router, private service: LoginService) { }

   async fazerlogin(usuario: Usuario){
     debugger;
      let user:any;
      usuario.ds_login = usuario['ds_login'].replace(/[.@]*/g, "");
     await this.service.Login(usuario).toPromise().then( (result:any) =>{
      if (result['acesso']) {
        user = true;
        sessionStorage.setItem('user', JSON.stringify(result));
        this.usuarioAutenticado = true;
        this.Menu.emit(true);
        this.router.navigate(['/']);

      }
      else {
        user = false;
        this.usuarioAutenticado = false;
        this.Menu.emit(false);

      }
    }

    ).catch( () =>{
      user = false;
      this.usuarioAutenticado = false;
      this.Menu.emit(false);
    }
    )
     return user

  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }

}
