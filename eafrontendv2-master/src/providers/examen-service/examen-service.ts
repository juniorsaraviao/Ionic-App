import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlRest = "https://evaluappapi.herokuapp.com/api/";
/*
  Generated class for the ExamenServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExamenServiceProvider {
	var = '';
  constructor(public http: Http) {
    console.log('Hello ExamenServiceProvider Provider');
  }

  /********examen-alumno****************************************/
  //lista de examenes pendientes
  getListExam(){
    let headers= new Headers();
    headers.append('s-session', window.localStorage.getItem('s-session'));

    var observable = Observable.create( observer =>{
			  this.http.get(urlRest + 'student/evaluation',{ headers: headers })
          .subscribe(dat=>{
            let res = dat.json();
            observer.next(res);
            observer.complete();
            observer.error('Algo esta mal!!');
          })
        }); 

    return observable;
  };
  //lista de examenes pasados
  getListNotas(){
    let headers= new Headers();
    headers.append('s-session', window.localStorage.getItem('s-session'));

    var observable = Observable.create( observer =>{
        this.http.get(urlRest + 'student/evaluation/results',{ headers: headers })
          .subscribe(dat=>{
            let res = dat.json();
            observer.next(res);
            observer.complete();
            observer.error('Algo esta mal!!');
          })
        }); 
    return observable;
  };

  /********rendir-examen-alumno********************************/
  //lista de alternativas
  getAlternative(id){
    let headers= new Headers();
    headers.append('s-session', window.localStorage.getItem('s-session'));

    var observable = Observable.create( observer =>{
        this.http.get(urlRest + 'student/evaluation/'+id+'/solutions',{ headers: headers })
          .subscribe(dat=>{
            let res = dat.json();
            observer.next(res);
            observer.complete();
            observer.error('Algo esta mal!!');
          })
        }); 

    return observable;
  };
  //inicio de examen
  startExamen(id_evaluation){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('s-session', window.localStorage.getItem('s-session'));

    let data = {
      evaluation_id: id_evaluation * 1
    };

    return Observable.create(observer => {
      this.http.post(urlRest + 'student/attempt/start', JSON.stringify(data), { headers: headers })
        .subscribe(dat => {
          observer.next(dat.json());
          observer.complete();
          observer.error('Algo esta mal en el registro!');
        });
    });
  }
  //fin de examen
  endExamen(id_attempt){
    let headers = new Headers();
    headers.append('s-session', window.localStorage.getItem('s-session'));

    let data = {
      attempt_id: id_attempt * 1
    };

    return Observable.create(observer => {
      this.http.post(urlRest + 'student/attempt/' + id_attempt + '/end', JSON.stringify(data), { headers: headers })
        .subscribe(dat => {
          observer.next(dat.json());
          observer.complete();
          observer.error('Algo esta mal en el registro!');
        });
    });
  }
  //enviar respuestas
  setRespuestas(attempt_id,question_id,answer){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('s-session', window.localStorage.getItem('s-session'));
    
    let data = {
      attempt_id : attempt_id,
      question_id : question_id,
      answer : answer
    };

    return Observable.create(observer => {
      this.http.post(urlRest + 'student/attempt/' + attempt_id + '/send-answer',  JSON.stringify(data), { headers: headers })
        .subscribe(dat => {
          observer.next(dat.json());
          observer.complete();
          observer.error('Algo esta mal en el registro!');
        });
    
    });
  }

  /*********resultados-examen-alumno*****************************/
  //mostrar los resultados de un intento
  getResultAttempt(id_attempt){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('s-session', window.localStorage.getItem('s-session'));

    console.log('1: primero');
    return Observable.create(observer => {
      this.http.get(urlRest + 'student/attempt/' + id_attempt + '/result',   { headers: headers })
        .subscribe(dat => {
          observer.next(dat.json());
          observer.complete();
          observer.error('Algo esta mal en el registro!');
        });
    });
  }
  //lista de intentos por una evaluacion
  getAttempts(id_evaluation){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('s-session', window.localStorage.getItem('s-session'));

    return Observable.create(observer => {
      this.http.get(urlRest + 'student/evaluation/' + id_evaluation + '/attempts',   { headers: headers })
        .subscribe(dat => {
          observer.next(dat.json());
          observer.complete();
          observer.error('Algo esta mal en el registro!');
        });
    });
  }
  //nota final de un examen
  getResultExam(id_evaluation){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('s-session', window.localStorage.getItem('s-session'));
    
    return Observable.create(observer => {
      this.http.get(urlRest + 'student/evaluation/' + id_evaluation + '/results',   { headers: headers })
        .subscribe(dat => {
          observer.next(dat.json());
          observer.complete();
          observer.error('Algo esta mal en el registro!');
        });
    });
  }

}


