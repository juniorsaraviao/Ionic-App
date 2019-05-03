import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { CodigoAccesoProvider } from '../../providers/codigo-acceso/codigo-acceso';

/**
 * Generated class for the GenerarCodigoAccesoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-generar-codigo-acceso',
  templateUrl: 'generar-codigo-acceso.html',
})
export class GenerarCodigoAccesoPage {
  new_cod_access = '';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public menuCtrl: MenuController,
              public conexion: CodigoAccesoProvider) {
                this.menuCtrl.enable(false,'MenuStudent');
                this.menuCtrl.enable(true,'MenuTeacher');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenerarCodigoAccesoPage');
  }

  actCodigo(){
    let res = this.conexion.patchCodCourse(this.new_cod_access);
    res.subscribe(
      data => {
        if(data.success){
          let alertRegister = this.alertCtrl.create({
            title: '¡Ha registrado su codigo de acceso!',
            buttons: ['OK']
          });
        this.new_cod_access = '';
        alertRegister.present();
        }
    });
  }
}
