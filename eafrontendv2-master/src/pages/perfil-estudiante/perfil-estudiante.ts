import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the PerfilEstudiantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-estudiante',
  templateUrl: 'perfil-estudiante.html',
})
export class PerfilEstudiantePage {
  noActualizar: boolean = true;
  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public menuCtrl: MenuController,
          public alerCtrl: AlertController) {
	 this.menuCtrl.enable(true,'MenuStudent');
  	this.menuCtrl.enable(false,'MenuTeacher');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilEstudiantePage');
  }

  actualizarData(){
    this.noActualizar = false;
  }

  atrasData(){
    this.noActualizar = true;
  }

  doConfirm() {
    let confirm = this.alerCtrl.create({
      title: 'Actualizar perfil?',
      message: 'Esta usted seguro de actualizar los datos de su perfil?',
      buttons: [
        {
          text: 'Rechazar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present()
}
}
