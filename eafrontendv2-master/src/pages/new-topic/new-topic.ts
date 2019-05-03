import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { NewTopicProvider } from '../../providers/new-topic/new-topic';

/**
 * Generated class for the NewTopicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-topic',
  templateUrl: 'new-topic.html',
})
export class NewTopicPage {
  cursos = [];
  tema_curso = {name:'', course_id:0};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public newTopic: NewTopicProvider,
              public menuCtrl: MenuController) {
                this.menuCtrl.enable(false,'MenuStudent');
                this.menuCtrl.enable(true,'MenuTeacher');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTopicPage');
  }

  ionViewWillEnter(){
    let res = this.newTopic.getListCourses();
  	res.subscribe(
      value => {
        if (value.success){
          this.cursos = value.courses;
          console.log(this.cursos);
          console.log('Si se llego a obtener los usuarios')
        }else{
          console.log('No se ha podido recuperar las pre-evaluaciones disponibles');
          console.log('No pude entrar');
        }
      },
      err => {console.log('Error: ' + err)},
      () => console.log('Este es el final')
      );
  }

  regNewTema(){
    this.newTopic.setTopic(this.tema_curso.name, Number(this.tema_curso.course_id)).subscribe(data => {
      if(data.success){
        let alertRegister = this.alertCtrl.create({
        title: '¡Ha registrado el tema!',
        buttons: ['OK']
        });
        alertRegister.present();
      }else{
        console.log('No se ha registrado el tema');
      }
    });
  }
}
