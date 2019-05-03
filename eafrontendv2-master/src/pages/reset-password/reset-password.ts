import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from '../login/login'
import { ResetPasswordServiceProvider } from '../../providers/reset-password-service/reset-password-service';



@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  resetForm : FormGroup;
  user = { user_or_email : ''}
 

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public resetService : ResetPasswordServiceProvider,
              public formBuilder : FormBuilder) {
    //Validación del formulario
    this.resetForm = formBuilder.group({
      email : ['',Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  resetPassword(){
    console.log("firedResetPassword")
    let res = this.resetService.resetPassword(this.user);

    res.subscribe(
      value =>{
        if (value.success){
          console.log("Se envió la contraseña a su correo");
          console.log('Redirigimos a la vista de Login');
          this.navCtrl.setRoot(LoginPage);
        }else{
          console.log("El usuario no existe")
          let alert = this.alertCtrl.create({
            title: 'No se pudo :(',
            subTitle: 'Nunca volverás a entrar a Evaluapp.',
            buttons: ['OK']
          });
          alert.present();
        }
      },
      err => {console.log('Error: ' + err)},//CONTROLAMOS LOS ERRORES
        () => console.log('this is the end') 
    )
  }
  
  //Método para regresar a la página de Login
  returnToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

  

}
