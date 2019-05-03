import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { NotaStudentProvider } from '../../providers/nota-student/nota-student';

/**
 * Generated class for the NotasProfesorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notas-profesor',
  templateUrl: 'notas-profesor.html',
})
export class NotasProfesorPage {
  estadoPag = 'Exam';
  exams = [];
  notas = [];
  nota_profe = {id: 0, course_period_id: 0, name: '', subject: '', start_datetime: '', end_datetime: '',
                questions_count: 0, correct_points: 0, error_points: 0, attempts_allowed: 0, duration_time: 0,
                everyone: 0, group_access: {}, is_solution_visible: 0, state: 0, difficulty_level: 0,
                type: 0, category: 0, is_random: 0, access_code: '', require_access_code: 0};
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public alertCtrl: AlertController,
              public notaStudent: NotaStudentProvider) {
                this.menuCtrl.enable(false,'MenuStudent');
                this.menuCtrl.enable(true,'MenuTeacher');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotasProfesorPage');
  }

  ionViewWillEnter(){
    let res = this.notaStudent.getListEval();
    res.subscribe(
      value => {
        if (value.success){
          this.exams = value.data;
          console.log('Si se llego a recuperar las evaluaciones');
        }else{
          console.log('No se ha podido recuperar las evaluaciones');
        }
      },
      err => {console.log('Error: ' + err)},
      () => console.log('Este es el final')
    );
  }

  itemSelected(examenes){
    this.nota_profe = examenes;
    let res = this.notaStudent.getNotas(Number(this.nota_profe.id));   
    res.subscribe(
      value => {
        if (value.success){
          this.notas = value.data;
          console.log('Si se llego a obtener las notas');
        }else{
          console.log('No se ha podido recuperar las notas');
        }
      },
      err => {console.log('Error: ' + err)},
      () => console.log('Este es el final')
    );
  this.estadoPag = 'Notas';
  }

  atrasFunc(){
    this.estadoPag = 'Exam';
  }
}
