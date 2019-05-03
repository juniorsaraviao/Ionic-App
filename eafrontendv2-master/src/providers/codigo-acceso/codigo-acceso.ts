import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlRest = "https://evaluappapi.herokuapp.com/api/";
/*
  Generated class for the CodigoAccesoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CodigoAccesoProvider {

  constructor(public http: Http) {
    console.log('Hello CodigoAccesoProvider Provider');
  }

  patchCodCourse(descripcion){
    //AGREGAMOS LAS CABECERAS Y PARAMETROS PARA LA CONSULTA
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-session', window.localStorage.getItem('x-session'));
    let data = {
      description : descripcion
    }

  	//CREAMOS UNA VARIABLE OBSERVABLE QUE GENERA LAS NOTIFICACIONES CONSULTANDO EL BACK
    return Observable.create(observer => {
  		this.http.patch(urlRest + 'admin/parameter/12', JSON.stringify(data), { headers: headers })
  			.subscribe(dat => {
	          observer.next(dat.json());
	          observer.complete();
	          observer.error('Algo esta mal en la actualizacion del codigo de acceso!');
  			});
  	});
  };
}
