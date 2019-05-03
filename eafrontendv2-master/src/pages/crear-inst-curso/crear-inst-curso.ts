import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { InstanciaCursoProvider } from '../../providers/instancia-curso/instancia-curso';

/**
 * Generated class for the CrearInstCursoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-inst-curso',
  templateUrl: 'crear-inst-curso.html',
})
export class CrearInstCursoPage {
	cursos = [];
	usuarios = [];
	curso_periodo = {
		course_id: 0, period: '', start_date: '',
		end_date: '', state: 40
  };
  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public alertCtrl: AlertController,
          public instCursoProv: InstanciaCursoProvider,
          public menuCtrl: MenuController) {
            this.menuCtrl.enable(false,'MenuStudent');
            this.menuCtrl.enable(true,'MenuTeacher');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearInstCursoPage');
  }

  ionViewWillEnter(){

  	let res2 = this.instCursoProv.getListCourses();
  	res2.subscribe(
      value2 => {
        if (value2.success){
          this.cursos = value2.courses;
          console.log(this.cursos);
          console.log('Si se llego a obtener los cursos')
        }else{
          console.log('No se ha podido recuperar las pre-evaluaciones disponibles');
          console.log('No pude entrar');
        }
      },
      err => {console.log('Error: ' + err)},
      () => console.log('Este es el final')
      );  	
  }

  regInstCurso(){
  	  this.instCursoProv.setInstCourse(this.curso_periodo.course_id, this.curso_periodo.period, 
  									 this.curso_periodo.start_date, this.curso_periodo.end_date, this.curso_periodo.state).subscribe(data => {
  		if(data.success){
          let alertRegister = this.alertCtrl.create({
            title: '¡Ha registrado el curso!',
            buttons: ['OK']
          });
        alertRegister.present();
      	}else{
        console.log('No se ha registrado el curso');
      	}
    });
  }
}
