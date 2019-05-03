import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { PreQuestionServiceProvider } from '../../providers/pre-question-service/pre-question-service';
/**
 * Generated class for the CrearPreguntaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-pregunta',
  templateUrl: 'crear-pregunta.html',
})
export class CrearPreguntaPage {
  preg_gener = {name: '', header: {text: '', pictures: []},
                statement: {text: '', pictures:[], alternatives:[{text:'', picture: []},{text:'', picture: []},{text:'', picture: []},{text:'', picture: []},{text:'', picture: []}]},
                answer: 0, solution: {text:'', pictures:[],videos:[]}, source:'', pre_evaluation_id:0,
                topic_id: 0, difficulty_level: 1
              };
  eval_disps = [];
  eval_disp = {course_period_id: 0, questions_count: 0};
  alt_correctas = [false,false,false,false,false];
  questions = [];
  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, 
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public loadingCtrl: LoadingController,
              public preQuestionServiceProvider: PreQuestionServiceProvider
              ) {
                this.menuCtrl.enable(false,'MenuStudent');
                this.menuCtrl.enable(true,'MenuTeacher');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearPreguntaPage');
  }

  ionViewWillEnter(){
    
    let res = this.preQuestionServiceProvider.getListEvaluation();
    res.subscribe(
      value => {
        if (value.success){
          this.eval_disps = value.data;
          console.log(this.eval_disps);
        }else{
          console.log('No se ha podido recuperar las pre-evaluaciones disponibles');
          console.log('No pude entrar');
        }
      },
      err => {console.log('Error: ' + err)},
      () => console.log('Este es el final')
      );
  }

  doConfirm() {
    this.preg_gener.pre_evaluation_id = Number(this.eval_disp.course_period_id);
    if ((this.questions.length + 1) <= this.eval_disp.questions_count) {
      let confirm = this.alertCtrl.create({
        title: 'Registrar pregunta?',
        message: '<p>Esta usted de acuerdo en registrar esta pregunta en la base de datos?.</p>',
        buttons: [
          {
            text: 'Rechazar',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              console.log('Agree clicked');
              console.log(this.preg_gener);
                  this.preQuestionServiceProvider.setGeneratePreQuestion(this.preg_gener.name, JSON.stringify(this.preg_gener.header), JSON.stringify(this.preg_gener.statement),
                                                            this.preg_gener.answer, JSON.stringify(this.preg_gener.solution), this.preg_gener.source,
                                                            Number(this.preg_gener.pre_evaluation_id), Number(this.preg_gener.topic_id) ,this.preg_gener.difficulty_level).subscribe(data => {
                  if(data.success){
                    this.questions.length = this.questions.length + 1;
                    let alertRegister = this.alertCtrl.create({
                      title: 'Pregunta registrada',
                      message: 'Ha registrado ' + this.questions.length + ' preguntas de ' + this.eval_disp.questions_count,
                      buttons: ['OK']
                    });
                    alertRegister.present();
                    this.preg_gener.name = '';
                    this.preg_gener.header.text = '';
                    this.preg_gener.topic_id = 1;
                    this.preg_gener.statement.text = '';
                    this.preg_gener.solution.text = '';
                    this.preg_gener.source = '';
                    this.preg_gener.statement.alternatives[0].text = '';
                    this.preg_gener.statement.alternatives[1].text = '';
                    this.preg_gener.statement.alternatives[2].text = '';
                    this.preg_gener.statement.alternatives[3].text = '';
                    this.preg_gener.statement.alternatives[4].text = '';
                    this.alt_correctas = [false,false,false,false,false];
                  }else{
                    console.log('No se ha registrado su pregunta');
                  }
              });
            }
          }
        ]
      });
      confirm.present()
    }else{
      let noPermitir = this.alertCtrl.create({
        title: 'Pregunta no registrada',
        message: 'Se ha alcanzado el numero maximo de preguntas de la evaluacion',
        buttons: ['OK']
      });
      noPermitir.present();
    }
  }

  regQuestion(){
    var num:number=0;
    var i:number;
    var aux:number=0;

    for(i=4;i>=0;i--){
      if (this.alt_correctas[i] == true ){
        aux = 2**(4-i);
      }else{
        aux = 0;
      }
      num = num + aux;
    }

    this.preg_gener.answer = num;

  }

  enlistarPreguntas(){
    let res = this.preQuestionServiceProvider.getListQuestion(Number(this.eval_disp.course_period_id));
    res.subscribe(
      value => {
        if (value.success){
          this.questions = value.data;
          console.log('*+++++++++++*');
          console.log(this.questions);
          console.log('*+++++++++++*');
        }else{
          console.log('No se ha podido recuperar las preguntas disponibles');
          console.log('No pude entrar');
        }
      },
      err => {console.log('Error: ' + err)},
      () => console.log('Este es el final')
      );
  }
}


