import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlRest = "https://evaluappapi.herokuapp.com/api/";
/*
  Generated class for the InstanciaCursoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InstanciaCursoProvider {

  constructor(public http: Http) {
    console.log('Hello InstanciaCursoProvider Provider');
  }

  getListCourses(){
  	//AGREGAMOS LAS CABECERAS Y PARAMETROS PARA LA CONSULTA
  	let headers = new Headers();
  	headers.append('x-session', window.localStorage.getItem('x-session'));

  	console.log('pintar var', window.localStorage.getItem('x-session'));

  	//CREAMOS UNA VARIABLE OBSERVABLE QUE GENERA LAS NOTIFICACIONES CONSULTANDO EL BACK
  	var observable = Observable.create( observer => {
  		this.http.get(urlRest + 'admin/course', { headers: headers})
  		.subscribe(dat=>{
  			let res = dat.json();
  			observer.next(res);
  			observer.complete();
  			observer.error('Algo esta mal!!');
  		})
  	});
  	return observable;
  };

  getListUsers(){
  	//AGREGAMOS LAS CABECERAS Y PARAMETROS PARA LA CONSULTA
  	let headers = new Headers();
  	headers.append('x-session', window.localStorage.getItem('x-session'));

  	console.log('pintar var', window.localStorage.getItem('x-session'));

  	//CREAMOS UNA VARIABLE OBSERVABLE QUE GENERA LAS NOTIFICACIONES CONSULTANDO EL BACK
  	var observable = Observable.create( observer => {
  		this.http.get(urlRest + 'admin/user', { headers: headers})
  		.subscribe(dat=>{
  			let res = dat.json();
  			observer.next(res);
  			observer.complete();
  			observer.error('Algo esta mal!!');
  		})
  	});
  	return observable;
  };

  setInstCourse(curso_id, curso_periodo, curso_fecha_1, curso_fecha_2, curso_estado){
  	let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-session', window.localStorage.getItem('x-session'));

    let data={
    	course_id: curso_id,
    	period: curso_periodo,
    	start_date: curso_fecha_1,
    	end_date: curso_fecha_2,
    	state: curso_estado
    };

    return Observable.create(observer => {
  		this.http.post(urlRest + 'admin/course-period', JSON.stringify(data), { headers: headers })
  			.subscribe(dat => {
	          observer.next(dat.json());
	          observer.complete();
	          observer.error('Algo esta mal en la creacion de pregunta!');
  			});
  	});
  }	
}