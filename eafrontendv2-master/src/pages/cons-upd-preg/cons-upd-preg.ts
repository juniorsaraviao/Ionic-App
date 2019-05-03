import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { ConsularActualizarPreguntaProvider } from '../../providers/consular-actualizar-pregunta/consular-actualizar-pregunta';
import { PreQuestionServiceProvider } from '../../providers/pre-question-service/pre-question-service';

/**
 * Generated class for the ConsUpdPregPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cons-upd-preg',
  templateUrl: 'cons-upd-preg.html',
})
export class ConsUpdPregPage {
  noActualizar: boolean = true;
  codReq = false;
  tema = [];
  course_period = [];
  exams = [];
  questions = [];
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

  detail_question = {
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public conexion: ConsularActualizarPreguntaProvider,
    public questionProvider: PreQuestionServiceProvider
  ) {
  this.menuCtrl.enable(false,'MenuStudent');
  this.menuCtrl.enable(true,'MenuTeacher');
}
  ionViewWillEnter(){
    let res = this.conexion.getListEval();
    res.subscribe(
      value => {
        if (value.success){
          this.exams = value.data;
          console.log('Si se llego a recuperar las evaluaciones');
          console.log(this.exams);
          
        }else{
          console.log('No se ha podido recuperar las evaluaciones');
        }
      },
      err => {console.log('Error: ' + err)},
      () => console.log('Este es el final')
    );
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsUpdPregPage');
  }

  itemSelected(examenes){
    this.noActualizar = true;
    this.detail_exam = examenes;
    console.log('----------------------');
    console.log(this.detail_exam.name);
    console.log('----------------------');

    let resaux = this.questionProvider.getListQuestion(Number(this.detail_exam.id));
    resaux.subscribe(
      value => {
        if (value.success){
          this.questions = value.data;
          console.log('Si se llego a recuperar las preguntas');
          console.log(this.questions);
          
        }else{
          console.log('No se ha podido recuperar las preguntas');
        }
      },
      err => {console.log('Error: ' + err)},
      () => console.log('Este es el final')
    );
    this.estadoPag = 'listQuestions';
  }

  itemSelectedQuestion(question){
    console.log(question);
    console.log(question.name);
    console.log(question.statement.alternatives);
    this.noActualizar = true;
    this.detail_question = question;
    this.estadoPag = 'detalleQuestion'
  }
}
