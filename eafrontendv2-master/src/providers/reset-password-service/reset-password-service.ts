import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = "https://evaluappapi.herokuapp.com/api/";

@Injectable()
export class ResetPasswordServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ResetPasswordServiceProvider Provider');
  }

  resetPassword(datauser){
    console.log("Cerrando Sesión")

    let data = {
      uem : datauser.user_or_email
    };
    console.log(data)

    var observable = Observable.create(observer =>{
      this.http.post(apiUrl+'student/auth/reset-password',JSON.stringify(data),httpOptions)
        .subscribe(dat=>{
          //AQUI SE PUEDE CAMBIAR POR DATOS FAKE HASTA ASOCIARLO CON SU SERVICIO
          observer.next(dat);//ENVIAMOS LA RESPUESTA DEL SERVIDOR AL OBSERVER
          observer.complete();
          observer.error('Algo esta mal!!');
      }
      )
    });

    return observable
  }
}
