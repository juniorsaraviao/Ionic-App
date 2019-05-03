import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
/**
 * Generated class for the ExamenProfesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-examen-profesor',
  templateUrl: 'examen-profesor.html',
})
export class ExamenProfesorPage {
	tempExam: string = "Programados";

  constructor(public navCtrl: NavController, 
  	          public navParams: NavParams,
  	          public menuCtrl: MenuController) {
  	this.menuCtrl.enable(false,'MenuStudent');
  	this.menuCtrl.enable(true,'MenuTeacher');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExamenProfesorPage Test');
  }

}
