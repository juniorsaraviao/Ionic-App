import { Component,ViewChild } from '@angular/core';
import { LoadingController, ToastController, IonicPage, NavController, NavParams,AlertController, Slides } from 'ionic-angular';
import { ExamenServiceProvider } from '../../providers/examen-service/examen-service';
import { MenuController } from 'ionic-angular';
import { ExamenAlumnoPage } from '../examen-alumno/examen-alumno';

/**
 * Generated class for the ResultadosExamenAlumnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultados-examen-alumno',
  templateUrl: 'resultados-examen-alumno.html',
})
export class ResultadosExamenAlumnoPage {

  @ViewChild(Slides) slides: Slides;

  id:number;//id de evaluacion
  attempt_current:number;//id de attempt

  showResultAttempt : boolean = true;
  showResultEnd: boolean = false;

  list_attempt = [];
  nota: '0';

  msgResultAttempt = '';
  msgResultEnd = '';
  
  dynamicColorAttempt = 'dark';
  dynamicColorEnd = 'dark';

  result:number;
  question_count:number;
  answer_correct:number;
  answer_error:number;
  answer_blank:number;

  constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public examenServiceProvider: ExamenServiceProvider,
		public menuCtrl: MenuController,
		private alertCtrl: AlertController,
		public toastCtrl: ToastController) {

	this.menuCtrl.enable(true,'MenuStudent');
  	this.menuCtrl.enable(false,'MenuTeacher');

  	this.id = navParams.get('id');
  	this.attempt_current = navParams.get('attempt_current');

  }

	ionViewDidLoad() {
	    console.log('ionViewDidLoad ResultadosExamenAlumnoPage');
	}

  	getResultExam(id_evaluation){
	  	console.log('obtener resultados');
		this.examenServiceProvider.getResultExam(id_evaluation).subscribe(
				value => {
				if (value.success){
					this.nota = value.data;
					if(Number(this.nota)>=18){
						this.msgResultEnd = 'Felicitaciones por tu esfuerzo!!!';
						this.dynamicColorEnd = 'secondary';
					}else if(Number(this.nota)<10){
						this.msgResultEnd = 'Sigue esforzandote!!!';
						this.dynamicColorEnd = 'danger';
					}else{
						this.msgResultEnd = 'Vas por buen camino!!!'
						this.dynamicColorEnd = 'primary';
					}

				}else{
					console.log('No se ha podido recuperar los examenes pendientes del alumno.');
				}
			},
			err => {console.log('Error: ' + err)},//CONTROLAMOS LOS ERRORES
			() => console.log('this is the end')
		);
	}

	getResultAttempt(id_attempt){
		console.log('obtener resultado de intentos');
		this.examenServiceProvider.getResultAttempt(id_attempt).subscribe(
			value =>{
				if(value.success){
					this.result = value.data.result;
					this.question_count = value.data.question_count;
					this.answer_correct = value.data.answer_correct;
					this.answer_error = value.data.answer_error;
					this.answer_blank = value.data.answer_blank;

					if(Number(this.result)>=18){
						this.msgResultAttempt = 'Felicitaciones por tu esfuerzo!!!';
						this.dynamicColorAttempt = 'secondary';
					}else if(Number(this.result)<10){
						this.msgResultAttempt = 'Sigue esforzandote!!!';
						this.dynamicColorAttempt = 'danger';
					}else{
						this.msgResultAttempt = 'Vas por buen camino!!!'
						this.dynamicColorAttempt = 'primary';
					}


				}else{
					const alert01 = this.alertCtrl.create({
				    	title: 'No se ha podido establecer conexion!',
				    	subTitle: 'Puede consultar sus notas en la vista de examenes',
				    	buttons: ['OK']
				    });
					alert01.present();	
				}

			},
			err => { console.log('Error: ' + err)},
			() => console.log('End Get Result Attempt')
		);
	}

	ionViewWillEnter(){
		this.getResultAttempt(this.attempt_current);
		this.getResultExam(this.id);		
	}
	irExamen(){
		this.navCtrl.setRoot(ExamenAlumnoPage);
	}

	mostrarResultAttempt(){
		this.showResultAttempt = true;
  		this.showResultEnd = false;
	}

	mostrarResultEnd(){
		this.showResultAttempt = false;
  		this.showResultEnd = true;
	}

	getTime(inputSeconds: number) {
		var sec_num = parseInt(inputSeconds.toString(), 10);
		var hours = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);
		return this.addo(hours) + ":" + this.addo(minutes) + ":" + this.addo(seconds);
	}
  
  	getFecha(horadia) {
    	let format = new Date(horadia);
    	return this.addo(format.getUTCFullYear()) + "-" + this.addo(format.getUTCMonth()) + "-" + this.addo(format.getUTCDate());
	}
	getMinute(inputSeconds: number) {
		var sec_num = parseInt(inputSeconds.toString(), 10);
		var minutes = Math.floor(sec_num / 60);
		var seconds = sec_num - (minutes * 60);
		return this.addo(minutes) + ":" + this.addo(seconds);
	}
  	addo(comp) {
    	return (((comp + "").length == 1) ? "0" + comp : comp);
 	}


}
