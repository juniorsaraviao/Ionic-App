import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { MenuController } from 'ionic-angular';
import { CrearCursoProvider } from '../../providers/crear-curso/crear-curso';

/**
 * Generated class for the AddCoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-course',
  templateUrl: 'add-course.html',
})
export class AddCoursePage {
  curso = {
    name : '',
    institution_id : 1
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public cursoProv: CrearCursoProvider,
    public menuCtrl: MenuController) {
      this.menuCtrl.enable(false,'MenuStudent');
      this.menuCtrl.enable(true,'MenuTeacher');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCoursePage');
  }
  ionViewWillEnter(){
    console.log('Cargo AddCoursePage');
  }
  
  regCurso(){
    this.cursoProv.setCourse(this.curso.name,this.curso.institution_id).subscribe(data => {
    if(data.success){
        let alertRegister = this.alertCtrl.create({
          title: '¡Has creado un curso nuevo!',
          buttons: ['OK']
        });
      alertRegister.present();
      }else{
      console.log('No se creo el curso 182');
      }
  });
}

}
