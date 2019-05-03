import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlRest = "https://evaluappapi.herokuapp.com/api/";
/*
  Generated class for the EliminarCursoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EliminarCursoProvider {

  constructor(public http: Http) {
    console.log('Hello EliminarCursoProvider Provider');
  }

  deleteCourse(course_id){
    let headers =new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-session', window.localStorage.getItem('x-session'));

      let data = {
        id: course_id
    }


    return Observable.create(observer => {
      this.http.delete(urlRest + 'admin/course/'+ data.id, { headers: headers })
        .subscribe(dat => {
            observer.next(dat.json());
            observer.complete();
            observer.error('Algo esta mal en la creacion del curso!');
        });
    });

  }

}
