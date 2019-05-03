import { Component,ViewChild } from '@angular/core';
import { App, IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { ExamenServiceProvider } from '../../providers/examen-service/examen-service';
import { MenuController } from 'ionic-angular';
import { TimerPage } from '../timer/timer';
import { RendirExamenAlumnoPage } from '../rendir-examen-alumno/rendir-examen-alumno';


@IonicPage()
@Component({
  selector: 'page-examen-alumno',
  templateUrl: 'examen-alumno.html',
})
export class ExamenAlumnoPage {

	//variables globales
	examenPendingCurrent = {
		id: null,
		name: '',
		subject: '',
		correct_points: null,
		error_points: null,
		attempts_allowed: null,
		start_datetime: '',
		end_datetime:'',
		duration_time: null
	};

	//variables para el inicio
	examen = 'exam-pendiente';
	exam_pendientes = [];
	exam_pasados = [];
	estadoLista = 'listaExamenes';
	detail_exam = '';

	//variables para el resultado
	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public examenServiceProvider: ExamenServiceProvider,
		public menuCtrl: MenuController,
		private alertCtrl: AlertController,
		public appCtrl: App) {
	  	this.menuCtrl.enable(true,'MenuStudent');
  		this.menuCtrl.enable(false,'MenuTeacher');	

	}

	ionViewDidLoad() {
	    console.log('Inicializando ExamenAlumnoPage');

	}

	ionViewWillEnter(){
		this.menuCtrl.enable(true,'MenuStudent');
		let res1 = this.examenServiceProvider.getListExam();

	    res1.subscribe(
	      value => {
	        if (value.success){
		    	this.exam_pendientes = value.data;
	        }else{
	        	console.log('No se ha podido recuperar los examenes pendientes del alumno.');
	        }
	      },
	      err => {console.log('Error: ' + err)},//CONTROLAMOS LOS ERRORES
	      () => console.log('this is the end')
	    );

		let res2 = this.examenServiceProvider.getListNotas();

	    res2.subscribe(
	      value => {
	        if (value.success){
		    	this.exam_pasados = value.data;
	        }else{
	        	console.log('No se ha podido recuperar los examenes pasados del alumno.');
	        }
	      },
	      err => {console.log('Error: ' + err)},//CONTROLAMOS LOS ERRORES
	      () => console.log('this is the end')
	    );
	}
	infoExamen(examen){
		this.estadoLista = 'infoExamen';
		
		
		this.detail_exam = examen;
	}
	rendirExamen($id){
		//INI: 0
		//Establacemos el examen pendiente actual y su duraccion		
		let message = 'Duración ';
		let examenCurrent = this.examenPendingCurrent;
		this.exam_pendientes.forEach(function (elemento, indice, array) {
    		if (elemento.id == $id){
				examenCurrent = elemento;
				return;
    		};
		});
    	this.examenPendingCurrent = examenCurrent;

		message = message.concat(this.getMinute(examenCurrent.duration_time),' minutos');
		let alert = this.alertCtrl.create({
	    	title: message,
	    	message: 'No podra realizar otras acciones con su móvil, de ser asi se terminará el examen inmediatamente',
	    	buttons: [
	      	{
	        	text: 'Cancelar',
	        	role: 'cancel',
	        	handler: () => {
	          		console.log('Se cancelo el inicio de la prueba.');
	        	}
	      	},
	      	{
	        	text: 'Ir a la prueba',
	        	handler: () => {

	        		this.navCtrl.setRoot(RendirExamenAlumnoPage,{
	        			id: examenCurrent.id,
						duration_time: examenCurrent.duration_time,
						name: examenCurrent.name
					});
	        	}//end hadler
	      	}
	    	
	    	]
	  	});
	  	alert.present();
	  	//END 2

	}

	//FORMATEO FECHAS

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