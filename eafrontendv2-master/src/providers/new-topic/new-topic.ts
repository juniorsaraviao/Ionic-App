import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlRest = "https://evaluappapi.herokuapp.com/api/";
/*
  Generated class for the NewTopicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewTopicProvider {

  constructor(public http: Http) {
    console.log('Hello NewTopicProvider Provider');
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

  setTopic(nombre_tema, curso_id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-session', window.localStorage.getItem('x-session'));
    let data={
			name: nombre_tema,
			parent_id: null,
			parents: null,
      course_id: curso_id
    };

    return Observable.create(observer => {
  		this.http.post(urlRest + 'admin/topic', JSON.stringify(data), { headers: headers })
  			.subscribe(dat => {
	          observer.next(dat.json());
	          observer.complete();
	          observer.error('Algo esta mal en la creacion de pregunta!');
  			});
  	});
  }
}
