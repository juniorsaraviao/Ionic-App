import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlRest = "https://evaluappapi.herokuapp.com/api/";
/*
  Generated class for the UserCourseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserCourseProvider {

  constructor(public http: Http) {
    console.log('Hello UserCourseProvider Provider');
  }

  getListCourses(){
  	//AGREGAMOS LAS CABECERAS Y PARAMETROS PARA LA CONSULTA
  	let headers = new Headers();
  	headers.append('x-session', window.localStorage.getItem('x-session'));

  	console.log('pintar var', window.localStorage.getItem('x-session'));

  	//CREAMOS UNA VARIABLE OBSERVABLE QUE GENERA LAS NOTIFICACIONES CONSULTANDO EL BACK
  	var observable = Observable.create( observer => {
  		this.http.get(urlRest + 'admin/course-period', { headers: headers})
  		.subscribe(dat=>{
  			let res = dat.json();
  			observer.next(res);
  			observer.complete();
  			observer.error('Algo esta mal!!');
  		})
  	});
  	return observable;
  };  

  getListAlumnos(course_period_id){
  	//AGREGAMOS LAS CABECERAS Y PARAMETROS PARA LA CONSULTA
  	let headers = new Headers();
  	headers.append('x-session', window.localStorage.getItem('x-session'));

  	console.log('pintar var', window.localStorage.getItem('x-session'));

  	//CREAMOS UNA VARIABLE OBSERVABLE QUE GENERA LAS NOTIFICACIONES CONSULTANDO EL BACK
  	var observable = Observable.create( observer => {
  		this.http.get(urlRest + 'admin/course-period/' + course_period_id + '/studentnot', { headers: headers})
  		.subscribe(dat=>{
  			let res = dat.json();
  			observer.next(res);
  			observer.complete();
  			observer.error('Algo esta mal!!');
  		})
  	});
  	return observable;
  }; 

  setRelAlumCurso(id_curso, estudiante_id){
	let headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('x-session', window.localStorage.getItem('x-session'));

	let data = {
		id: id_curso,
		student_id: estudiante_id
	};

	return Observable.create(observer => {
		this.http.post(urlRest + 'admin/course-period/' +id_curso+ '/student', JSON.stringify(data), { headers: headers })
			.subscribe(dat => {
				observer.next(dat.json());
				observer.complete();
				observer.error('Algo esta man con la creacion de la evaluacion!');
			});
		});
	}
}
