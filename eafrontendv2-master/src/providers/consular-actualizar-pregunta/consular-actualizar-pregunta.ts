import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlRest = "https://evaluappapi.herokuapp.com/api/";

/*
  Generated class for the ConsularActualizarPreguntaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConsularActualizarPreguntaProvider {

  constructor(public http: Http) {
    console.log('Hello ConsularActualizarPreguntaProvider Provider');
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

  getCoursePeriod(identificador){
  	//AGREGAMOS LAS CABECERAS Y PARAMETROS PARA LA CONSULTA
  	let headers= new Headers();
  	headers.append('x-session', window.localStorage.getItem('x-session'));

  	//CREAMOS UNA VARIABLE OBSERVABLE QUE GENERARA LAS NOTIFICACIONES CONSULTANDO EL BACK
  	var observable = Observable.create( observer => {
      this.http.get(urlRest + 'admin/course-period/' + identificador,{ headers: headers})
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

  getTopic(identificador){
  	//AGREGAMOS LAS CABECERAS Y PARAMETROS PARA LA CONSULTA
  	let headers= new Headers();
  	headers.append('x-session', window.localStorage.getItem('x-session'));

  	//CREAMOS UNA VARIABLE OBSERVABLE QUE GENERARA LAS NOTIFICACIONES CONSULTANDO EL BACK
  	var observable = Observable.create( observer => {
      this.http.get(urlRest + 'admin/topic/' + identificador,{ headers: headers})
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

  updateQuestion(id_question, name_question, name_header, name_statement, name_answer, name_sol, name_source, name_pre_eval, name_topic, name_diff){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-session', window.localStorage.getItem('x-session'));

    let data = {
      name_question:name_question, 
      name_header: name_header, 
      name_statement: name_statement,
      name_answer: name_answer,
      name_sol: name_sol,
      name_source: name_source,
      name_pre_eval: name_pre_eval,
      name_topic: name_topic, 
      name_diff: name_diff
    };

    return Observable.create(observer => {
    this.http.patch(urlRest + 'admin/question/' + id_question, JSON.stringify(data), { headers: headers })
      .subscribe(dat => {
      observer.next(dat.json());
      observer.complete();
      observer.error('Algo esta man con la creacion de la evaluacion!');
      });
    });
 }

}
