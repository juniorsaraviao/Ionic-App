import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { RegistrarProfesorProvider } from '../../providers/registrar-profesor/registrar-profesor';

/**
 * Generated class for the RegisterProfesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-profesor',
  templateUrl: 'register-profesor.html',
})
export class RegisterProfesorPage {

  profesor = {
    username : '',
    password : '',
    profile_id : 'T',
    state : 10
  };
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public profesorProvider: RegistrarProfesorProvider,
    public menuCtrl: MenuController) {
      this.menuCtrl.enable(false,'MenuStudent');
      this.menuCtrl.enable(true,'MenuTeacher'); 
  };

  ionViewDidLoad(){
    console.log('ionViewDidLoad RegisterProfesorPage');
  }

  ionViewWillEnter(){
    console.log('Cargo RegisterProfesorPage');
  }

  regProfesor(){
    this.profesorProvider.setTeacher(this.profesor.username,this.profesor.password,this.profesor.profile_id,this.profesor.state).subscribe(data => {
    if(data.success){
        let alertRegister = this.alertCtrl.create({
          title: '¡Has registrado un profesor!',
          buttons: ['OK']
        });
      alertRegister.present();
      }else{
      console.log('No se registro el');
      }
  });
}
}
