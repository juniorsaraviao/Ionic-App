import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const urlRest = "https://evaluappapi.herokuapp.com/api/";

/*
  Generated class for the RegistrarProfesorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegistrarProfesorProvider {

  constructor(public http: Http) {
    console.log('Hello RegistrarProfesorProvider Provider');
  }

  setTeacher(username, password, profile_id, state){
    let headers =new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-session', window.localStorage.getItem('x-session'));

      let data = {
          username : username,
          password : password,
          profile_id : profile_id,
          state : state
      }
    
      return Observable.create(observer => {
        this.http.post(urlRest + 'admin/user', JSON.stringify(data), { headers: headers })
          .subscribe(dat => {
              observer.next(dat.json());
              observer.complete();
              observer.error('Algo esta mal en la creacion del curso!');
          });
      });
  }

}
