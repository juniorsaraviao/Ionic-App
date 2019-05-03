import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { ConsultarActualizarEvaluacionProvider } from '../../providers/consultar-actualizar-evaluacion/consultar-actualizar-evaluacion';

/**
 * Generated class for the ConsUpdEvPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cons-upd-ev',
  templateUrl: 'cons-upd-ev.html',
})
export class ConsUpdEvPage {

  fecha_aux1 = '';
  fecha_aux2 = '';
  nombreEvalAnt = '';
  noActualizar: boolean = true;
  codReq = false;
  tema = [];
  course_period = [];
  exams = [];
  duracion_examen = 0;
  estadoPag = 'listEvaluations';
  curso_disps = [];
  curso_ident: {curso_periodo_id: 0, curso_id: 0};
  detail_exam = {
                 access_code: '',
  ​               attempts_allowed: 0,
                 category: 0,
                correct_points: 0,
                course_period_id: 0,
                difficulty_level: 0,
                duration_time: 0,
                end_datetime: '',
                error_points: 0,
                everyone: 0,
                group_access: "{}",
                id: 0,
                is_random: 0,
                is_solution_visible: 0,
                name: '',
                questions_count: 0,
                require_access_code: 0,
                start_datetime: '',
                state: 0,
                subject: 0,
                type: 0};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public alertCtrl: AlertController,
              public conexion: ConsultarActualizarEvaluacionProvider
            ) {
            this.menuCtrl.enable(false,'MenuStudent');
            this.menuCtrl.enable(true,'MenuTeacher');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsUpdEvPage');
  }

  ionViewWillEnter(){
    let res = this.conexion.getListEval();
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
    this.course_period = [];
    this.noActualizar = true;
    this.detail_exam = examenes;
    this.nombreEvalAnt = this.detail_exam.name;
    this.estadoPag = 'detalleEvaluations';
    this.duracion_examen = Number(this.detail_exam.duration_time) / 60;

    if (this.detail_exam.require_access_code == 0){
      this.codReq = false;
    }else{
      this.codReq = true;
    }

    let res = this.conexion.getCoursePeriod(Number(this.detail_exam.course_period_id));
    res.subscribe(
      value => {
        if (value.success){
          this.course_period = value.data;
          console.log('Si se llego a recuperar el curso seccion');
        }else{
          console.log('No se ha podido recuperar el curso seccion');
        }
      },
      err => {console.log('Error: ' + err)},
      () => console.log('Este es el final')
    );

    let res2 = this.conexion.getTopic(Number(this.detail_exam.subject));
    res2.subscribe(
      value => {
        if (value.success){
          this.tema = value.data;
          console.log('+--------------+');
          console.log( this.tema);
          console.log('+--------------+');
          console.log('Si se llego a recuperar el curso seccion');
        }else{
          console.log('No se ha podido recuperar el curso seccion');
        }
      },
      err => {console.log('Error: ' + err)},
      () => console.log('Este es el final')
    );    
  }

  atrasFunc(){
    this.estadoPag = 'listEvaluations';
  }

  doConfirm(){
    this.noActualizar = false;
  }

  actualizarData(){
    this.detail_exam.correct_points = 20 / Number(this.detail_exam.questions_count);
    this.fecha_aux1 = this.detail_exam.start_datetime.substring(0,10) + ' ' + this.detail_exam.start_datetime.substring(11,19);
    this.fecha_aux2 = this.detail_exam.end_datetime.substring(0,10) + ' ' + this.detail_exam.end_datetime.substring(11,19);
    this.detail_exam.duration_time = 60 * this.duracion_examen;
    if (this.codReq == true){
      this.detail_exam.require_access_code = 1;
    }else{
      this.detail_exam.require_access_code = 0;
      this.detail_exam.access_code = '';
    }
    const confirm = this.alertCtrl.create({
      title: 'Actualizar evaluacion?',
      message: 'Esta usted seguro en actualizar la evaluacion: ' + this.nombreEvalAnt + '?',
      buttons: [
        {
          text: 'Rechazar',
          handler: () => {
            console.log('Disagree clicked');
            this.estadoPag = 'listEvaluations';
            this.estadoPag = 'listEvaluations';
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Agree clicked');
            let res = this.conexion.updateEvaluation(this.detail_exam.id, this.detail_exam.name, this.detail_exam.subject,
              this.fecha_aux1, this.fecha_aux2, this.detail_exam.questions_count, this.detail_exam.correct_points,
            this.detail_exam.error_points, this.detail_exam.attempts_allowed, this.detail_exam.duration_time, this.detail_exam.everyone,
            this.detail_exam.group_access, this.detail_exam.is_solution_visible, this.detail_exam.state, this.detail_exam.difficulty_level,
          this.detail_exam.type, this.detail_exam.category, this.detail_exam.is_random, this.detail_exam.access_code, this.detail_exam.require_access_code);
            res.subscribe(
              value => {
                if (value.success){
                  this.course_period = value.data;
                  console.log('Si se llego a actualizar la evaluacion');
                  let alertRegister = this.alertCtrl.create({
                    title: '¡Ha actualizado la evaluacion!',
                    buttons: [
                      {
                      text: 'OK',
                      handler: () => {
                        console.log('Ok clicked');
                        this.tema = [];
                        }
                        
                      }]
                  });
                  alertRegister.present();
                  this.estadoPag = 'listEvaluations';
                }else{
                  console.log('No se ha podido actualizar la evaluacion');
                }
              },
              err => {console.log('Error: ' + err)},
              () => console.log('Este es el final')
            );
          }
        }
      ]
    });
    confirm.present();

  }
}
