import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlRest = "https://evaluappapi.herokuapp.com/api/";

@Injectable()
export class LogOutServiceProvider {

  constructor(public http: Http) {
    console.log('Hello LogOutServiceProvider Provider');
  }

  logOut(){
    console.log('Obtenemos la sesion');
    //AGREGAMOS LOS CABECERAS Y PARAMETROS PARA LA CONSULTA
    let headers= new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('s-session', window.localStorage.getItem('s-session'));


    //CREAMOS UNA VARIABLE OBSERVABLE QUE GENERARA LAS NOTIFICACIONES CONSULTANDO EL BACK
    var observable = Observable.create( observer =>{
			  this.http.post(urlRest + 'student/auth/logout',null,{ headers: headers })
          .subscribe(dat=>{
            let res = dat.json();
            //AQUI SE PUEDE CAMBIAR POR DATOS FAKE HASTA ASOCIARLO CON SU SERVICIO
            observer.next(res);//ENVIAMOS LA RESPUESTA DEL SERVIDOR AL OBSERVER
            observer.complete();
            observer.error('Algo esta mal!!');
          })
        });  

    return observable;
  }

  logOutAdmin(){
    console.log('Obtenemos la sesion');
    //AGREGAMOS LOS CABECERAS Y PARAMETROS PARA LA CONSULTA
    let headers= new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-session', window.localStorage.getItem('x-session'));


    //CREAMOS UNA VARIABLE OBSERVABLE QUE GENERARA LAS NOTIFICACIONES CONSULTANDO EL BACK
    var observable = Observable.create( observer =>{
			  this.http.post(urlRest + 'admin/auth/logout',null,{ headers: headers })
          .subscribe(dat=>{
            let res = dat.json();
            //AQUI SE PUEDE CAMBIAR POR DATOS FAKE HASTA ASOCIARLO CON SU SERVICIO
            observer.next(res);//ENVIAMOS LA RESPUESTA DEL SERVIDOR AL OBSERVER
            observer.complete();
            observer.error('Algo esta mal!!');
          })
        });  

    return observable;
  }
}
