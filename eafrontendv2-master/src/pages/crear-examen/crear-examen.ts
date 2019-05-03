import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PreEvaluationServiceProvider } from '../../providers/pre-evaluation-service/pre-evaluation-service';

/**
 * Generated class for the CrearExamenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-examen',
  templateUrl: 'crear-examen.html',
})
export class CrearExamenPage {
  curso_disps = [];
  tema_disps = [];
  exam_gener = {name: '', subject: '', question_count: '', 
                correct_points: '', error_points: '', attempts_allowed: '',
                duration_time: '', course_id: '', difficulty_level: '',
                type: '', category: '', is_random: '', access_code: '',
                require_access_code: ''};

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public preEvaluationServiceProvider: PreEvaluationServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearExamenPage');
  }

  ionViewWillEnter(){
  	let res = this.preEvaluationServiceProvider.getListCourse();
  
  	res.suscribe(
  		value => {
  			if (value.success){
  				this.curso_disps = value.data;
  			}else{
  				console.log('No se ha podido recuperar los cursos disponibles');
  			}
  		},
  		err => {console.log('Error: ' + err)},//CONTROLAMOS LOS ERRORES
  		() => console.log('Este es el final')
  		);
  }

  enlistarTemas(idCurso){
  	var node = document.getElementById(idCurso);
  	let res = this.preEvaluationServiceProvider.getListSubjects(node);

  	res.suscribe(
  		value => {
  			if(value.success){
  				this.tema_disps = value.data;
  			}else{
  				console.log('No se ha podido recuperar los temas por cursos')
  			}
  		},
  		err => {console.log('Error: ' + err)},//CONTROLAMOS LOS ERRORES
  		() => console.log('Este es el final') 
  		);
  }

}
