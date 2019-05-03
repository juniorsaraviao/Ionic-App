import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlRest = "https://evaluappapi.herokuapp.com/api/";
/*
  Generated class for the PreQuestionServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PreQuestionServiceProvider {

  constructor(public http: Http) {
    console.log('Hello PreQuestionServiceProvider Provider');
  }

  getListEvaluation(){
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

	getListQuestion(identifier){
  	//AGREGAMOS LAS CABECERAS Y PARAMETROS PARA LA CONSULTA
  	let headers = new Headers();
  	headers.append('x-session', window.localStorage.getItem('x-session'));

  	console.log('pintar var', window.localStorage.getItem('x-session'));

  	//CREAMOS UNA VARIABLE OBSERVABLE QUE GENERA LAS NOTIFICACIONES CONSULTANDO EL BACK
  	var observable = Observable.create( observer => {
  		this.http.get(urlRest + 'admin/evaluation/' + identifier + '/questions' , { headers: headers})
  		.subscribe(dat=>{
  			let res = dat.json();
  			observer.next(res);
  			observer.complete();
  			observer.error('Algo esta mal!!');
  		})
  	});
  	return observable;
	};
	
  setGeneratePreQuestion(name_question, name_header, name_statement, name_answer, name_sol, name_source, name_pre_eval, name_topic, name_diff){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-session', window.localStorage.getItem('x-session'));

  	let data={
  		name: name_question,
      statement: name_statement,
  		header: name_header,
  		answer: name_answer,
  		solution: name_sol,
      evaluation_id: name_pre_eval,
      topic_id: name_topic,
  		
      source: name_source,
  		difficulty_level: name_diff
  	};

  	return Observable.create(observer => {
  		this.http.post(urlRest + 'admin/question', JSON.stringify(data), { headers: headers })
  			.subscribe(dat => {
	          observer.next(dat.json());
	          observer.complete();
	          observer.error('Algo esta mal en la creacion de pregunta!');
  			});
  	});
  }	
}
