import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, MenuController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { ExamenAlumnoPage } from '../examen-alumno/examen-alumno';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { RegisterPage } from '../register/register';
//import { CrearPreguntaPage } from '../crear-pregunta/crear-pregunta';
//import { NewEvaluationPage } from '../new-evaluation/new-evaluation';
//import { CrearInstCursoPage } from '../crear-inst-curso/crear-inst-curso';
//import { NewTopicPage } from '../new-topic/new-topic';
import { RelAlumCursoPage } from '../rel-alum-curso/rel-alum-curso';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeAlumnoPage } from '../home-alumno/home-alumno';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;

  //valores para el formulario
  user = { username: '', password: '', rol: '' };

  //Alerta que se muestra en caso que no ingrese las credenciales correctas
  alert = this.alertCtrl.create({
    title: 'Credenciales incorrectas',
    subTitle: 'Puede que tu usuario y/o contraseña sean incorrectas.',
    buttons: ['OK']
  });


  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public navParams: NavParams,
    public serviceLogin: LoginServiceProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder) {
    this.menuCtrl.enable(false, 'MenuStudent');
    //Validación del formulario
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required]
    })
  }



  ionViewDidLoad() {
    console.log('Carga LoginPage');
  }


  isLogin() {
    //Primero se valida si el formulario es válido
    if (this.loginForm.valid) {
      //Si tiene rol de estudiante
      if (this.user.rol == 'student') {
        let res = this.serviceLogin.getSessionStudent(this.user);
        res.subscribe(
          value => {
            if (value.success) {
              window.localStorage.setItem("s-session", value.data.session_id);
              console.log("ENTRO ESTUDIANTE");  
              this.navCtrl.setRoot(ExamenAlumnoPage);
            } else {
              this.alert.present();
            }
          },
          err => { console.log('Error: ' + err) },
          () => console.log('this is the end LoginStudent')
        );
      }
      //Si tiene el rol de profesor 
      else if (this.user.rol == 'admin') {
        let res = this.serviceLogin.getSessionAdmin(this.user);
        res.subscribe(
          value => {
            if (value.success) {
              window.localStorage.setItem("x-session", value.session.id);
              console.log('Redirigimos a la vista de generar evaluación');
              this.navCtrl.setRoot(RelAlumCursoPage);
            } else {
              this.alert.present();
            }
          },
          err => { console.log('Error: ' + err) },
          () => console.log('this is the end')
        );
      }
      else {
        console.log('Ingresa un rol')
      }
    }
    else {
      console.log("formulario no válido")
    }
  }


  //Te envía a la vista de Registro
  goRegister() {
    console.log("goRegister Fired")
    this.navCtrl.setRoot(RegisterPage)
  }

  //Te envía a la vista de Recuperar Contraseña
  goReset() {
    this.navCtrl.setRoot(ResetPasswordPage);
  }


}
