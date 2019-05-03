import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { EliminarCursoProvider } from '../../providers/eliminar-curso/eliminar-curso';
import { InstanciaCursoProvider } from '../../providers/instancia-curso/instancia-curso';
/**
 * Generated class for the DeleteCoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delete-course',
  templateUrl: 'delete-course.html',
})
export class DeleteCoursePage {
  cursos = [];
  cursoToBeDelete = {
    id : 0
  };
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public elimCursoProv: EliminarCursoProvider,
    public instCursoProv: InstanciaCursoProvider,
    public menuCtrl: MenuController) {
      this.menuCtrl.enable(false,'MenuStudent');
      this.menuCtrl.enable(true,'MenuTeacher');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeleteCoursePage');
  }

  ionViewWillEnter(){
  	let res2 = this.instCursoProv.getListCourses();
  	res2.subscribe(
      value2 => {
        if (value2.success){
          this.cursos = value2.courses;
          console.log(this.cursos);
          console.log('Si se llego a obtener los cursos')
        }else{
          console.log('No se ha podido recuperar las pre-evaluaciones disponibles');
          console.log('No pude entrar');
        }
      },
      err => {console.log('Error: ' + err)},
      () => console.log('Este es el final')
      );  	
  }

  elimCurso(){
  	  this.elimCursoProv.deleteCourse(this.cursoToBeDelete.id).subscribe(data => {
  		if(data.success){
          let alertRegister = this.alertCtrl.create({
            title: '¡Se ha eliminado el curso!',
            buttons: ['OK']
          });
        alertRegister.present();
      	}else{
        console.log('No se ha eliminado el curso!');
      	}
    });
  }

}
