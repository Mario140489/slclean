import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  rootURL:string;
  constructor(private http:HttpClient, @Inject('BASE_URL')baseUrl:string) {
    this.rootURL= baseUrl;
  }

   Login(data:any){

  let url = 'https://syss-26205.firebaseio.com/crm_usuario/'+data['ds_login']+'/'+data['ds_senha']+'.json';
   return   this.http.get(url).pipe();

  }

}
