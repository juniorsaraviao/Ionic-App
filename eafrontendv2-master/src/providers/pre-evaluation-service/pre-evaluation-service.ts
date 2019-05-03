import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlRest = "https://evaluappapi.herokuapp.com/api/";
/*
  Generated class for the PreEvaluationServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PreEvaluationServiceProvider {

  constructor(public http: Http) {
    console.log('Hello PreEvaluationServiceProvider Provider');
  }

  getListCourse(){
    //AGREGAMOS LAS CABECERAS Y PARAMETROS PARA LA CONSULTA
    let headers = new Headers();
    headers.append('x-session', window.localStorage.getItem('x-session'));

    console.log('pintar var', window.localStorage.getItem('x-session'));

    //CREAMOS UNA VARIABLE OBSERVABLE QUE GENERA LAS NOTIFICACIONES CONSULTANDO EL BACK
    var observable = Observable.create( observer => {
      this.http.get(urlRest + 'admin/course-period', { headers: headers})
      .subscribe(dat=>{
        let res = dat.json();
        console.log(res);
        observer.next(res);
        observer.complete();
        observer.error('Algo esta mal!!');
        })
    });
    return observable;
  };

  getListSubjects(id){
  	//AGREGAMOS LAS CABECERAS Y PARAMETROS PARA LA CONSULTA
  	let headers= new Headers();
  	headers.append('x-session', window.localStorage.getItem('x-session'));

  	//CREAMOS UNA VARIABLE OBSERVABLE QUE GENERARA LAS NOTIFICACIONES CONSULTANDO EL BACK
  	var observable = Observable.create( observer => {
//  		this.http.get(urlRest + 'admin/course/' +id+ '/topics',{ headers: headers})
      this.http.get(urlRest + 'admin/course/' + id + '/topics',{ headers: headers})
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

  setGeneratePreEvaluation(curso_id, nombre_examen, tema_examen, fecha_inicio, fecha_fin, num_preg, punto_bien, punto_mal,
                           intento_permitido, tiempo_duracion, todos_ex, grupo_acc, vis_sol, estado_ex, lvl_diff, tipo_ex,
                           cat_ex, rand_num, cod_acceso, cod_acces_req){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-session', window.localStorage.getItem('x-session'));

    let data = {
      course_period_id: curso_id,
      name: nombre_examen,
      subject: tema_examen,
      start_datetime: fecha_inicio,
      end_datetime: fecha_fin,
      questions_count: num_preg,
      correct_points: punto_bien,
      error_points: punto_mal,
      attempts_allowed: intento_permitido,
      duration_time: tiempo_duracion,
      everyone: todos_ex,
      group_access: grupo_acc,
      is_solution_visible: vis_sol,
      state: estado_ex,
      difficulty_level: lvl_diff,
      type: tipo_ex,
      category: cat_ex,
      is_random: rand_num,
      access_code: cod_acceso,
      require_access_code: cod_acces_req
    };

    return Observable.create(observer => {
      this.http.post(urlRest + 'admin/evaluation', JSON.stringify(data), { headers: headers })
        .subscribe(dat => {
          observer.next(dat.json());
          observer.complete();
          observer.error('Algo esta man con la creacion de la evaluacion!');
        });
    });
  }
}
