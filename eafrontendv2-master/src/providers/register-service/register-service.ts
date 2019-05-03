//import { HttpClient } from '@angular/common/http';
import { Headers, Http} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

const urlRest = "https://evaluappapi.herokuapp.com/api/";

@Injectable()
export class RegisterServiceProvider {

  constructor(public http: Http) {
    console.log('Hello RegisterServiceProvider Provider');
  }

  public setRegister(datauserregister){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = {
      username: datauserregister.username,
      password: datauserregister.password,
      first_name: datauserregister.nombres,
      last_name: datauserregister.apellidos,
      email: datauserregister.email,
      access_code: datauserregister.access_code
    };
    console.log('hola');
    console.log(data);
    return Observable.create(observer => {
      this.http.post(urlRest + 'student/auth/sign-up', JSON.stringify(data), { headers: headers })
        .subscribe(dat => {
          console.log(dat)
          observer.next(dat.json());
          observer.complete();
          observer.error('Algo esta mal en el registro!');
        });
    });

  }

}
