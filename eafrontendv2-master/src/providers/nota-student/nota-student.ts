import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlRest = "https://evaluappapi.herokuapp.com/api/";
/*
  Generated class for the NotaStudentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotaStudentProvider {

  constructor(public http: Http) {
    console.log('Hello NotaStudentProvider Provider');
  }

  getListEval(){
  	//AGREGAMOS LAS CABECERAS Y PARAMETROS PARA LA CONSULTA
  	let headers = new Headers();
  	headers.append('x-session', window.localStorage.getItem('x-session'));

  	console.log('pintar var', window.localStorage.getItem('x-session'));

  	//CREAMOS UNA VARIABLE OBSERVABLE QUE GENERA LAS NOTIFICACIONES CONSULTANDO EL BACK
  	var observable = Observable.create( observer => {
  		this.http.get(urlRest + 'admin/evaluation', { headers: headers})
  		.subscribe(dat=>{
  			let res = dat.json();
  			observer.next(res);
  			observer.complete();
  			observer.error('Algo esta mal!!');
  		})
  	});
  	return observable;
  };

  getNotas(id){
  	//AGREGAMOS LAS CABECERAS Y PARAMETROS PARA LA CONSULTA
  	let headers= new Headers();
  	headers.append('x-session', window.localStorage.getItem('x-session'));

  	//CREAMOS UNA VARIABLE OBSERVABLE QUE GENERARA LAS NOTIFICACIONES CONSULTANDO EL BACK
  	var observable = Observable.create( observer => {
      this.http.get(urlRest + 'admin/evaluation/' + id + '/final-result',{ headers: headers})
  			.subscribe(dat => {
  				let res = dat.json();
  				observer.next(res);
  				observer.complete();
  				observer.error('Algo esta mal!!');
          console.log('*****************');
          console.log(observable);
          console.log('*****************');
  			})
  	});
  	return observable;
  };
}
