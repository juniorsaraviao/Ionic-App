import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsHeaderComponent } from '../components/components-header/components-header'; 

import { MyApp } from './app.component';
import { AddCoursePage} from '../pages/add-course/add-course';
import { LoginPage } from '../pages/login/login';
import { CrearExamenPage } from '../pages/crear-examen/crear-examen';
import { CrearPreguntaPage } from '../pages/crear-pregunta/crear-pregunta';
import { PerfilProfesorPage } from '../pages/perfil-profesor/perfil-profesor';
import { ExamenAlumnoPage } from '../pages/examen-alumno/examen-alumno';
import { PerfilEstudiantePage } from '../pages/perfil-estudiante/perfil-estudiante';
import { NewEvaluationPage } from '../pages/new-evaluation/new-evaluation';
import {RegisterPage} from '../pages/register/register';
import { CrearInstCursoPage } from '../pages/crear-inst-curso/crear-inst-curso';
import { NewTopicPage } from '../pages/new-topic/new-topic';
import { RelAlumCursoPage } from '../pages/rel-alum-curso/rel-alum-curso';
import { ConsUpdEvPage } from '../pages/cons-upd-ev/cons-upd-ev';

import { ExamenProfesorPage } from '../pages/examen-profesor/examen-profesor';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { TimerPage } from '../pages/timer/timer';

import { RendirExamenAlumnoPage } from '../pages/rendir-examen-alumno/rendir-examen-alumno';
import { ResultadosExamenAlumnoPage } from '../pages/resultados-examen-alumno/resultados-examen-alumno';
import { NotasProfesorPage } from '../pages/notas-profesor/notas-profesor';
import { GenerarCodigoAccesoPage } from '../pages/generar-codigo-acceso/generar-codigo-acceso';


import { DeleteCoursePage } from '../pages/delete-course/delete-course';
import { RegisterProfesorPage } from '../pages/register-profesor/register-profesor'
import { HomeAlumnoPage } from '../pages/home-alumno/home-alumno';
import { ConsUpdPregPage } from '../pages/cons-upd-preg/cons-upd-preg';


import { LoginServiceProvider } from '../providers/login-service/login-service';
import { ExamenServiceProvider } from '../providers/examen-service/examen-service';
import { PreEvaluationServiceProvider } from '../providers/pre-evaluation-service/pre-evaluation-service';
import { RegisterServiceProvider } from '../providers/register-service/register-service';
import { LogOutServiceProvider } from '../providers/log-out-service/log-out-service';
import { ResetPasswordServiceProvider } from '../providers/reset-password-service/reset-password-service';
import { PreQuestionServiceProvider } from '../providers/pre-question-service/pre-question-service';
import { InstanciaCursoProvider } from '../providers/instancia-curso/instancia-curso';
import { NewTopicProvider } from '../providers/new-topic/new-topic';
import { UserCourseProvider } from '../providers/user-course/user-course';
import { NotaStudentProvider } from '../providers/nota-student/nota-student';
import { CodigoAccesoProvider } from '../providers/codigo-acceso/codigo-acceso';
import { ConsultarActualizarEvaluacionProvider } from '../providers/consultar-actualizar-evaluacion/consultar-actualizar-evaluacion';
import { CrearCursoProvider } from '../providers/crear-curso/crear-curso';
import { EliminarCursoProvider } from '../providers/eliminar-curso/eliminar-curso';
import { RegistrarProfesorProvider } from '../providers/registrar-profesor/registrar-profesor';
import { HabilitarExamenProvider } from '../providers/habilitar-examen/habilitar-examen';
import { ConsularActualizarPreguntaProvider } from '../providers/consular-actualizar-pregunta/consular-actualizar-pregunta';


@NgModule({
  declarations: [
    ComponentsHeaderComponent,
    MyApp,
    LoginPage,
    ExamenAlumnoPage,
    TimerPage,
    CrearExamenPage,
    CrearPreguntaPage,
    PerfilProfesorPage,
    ExamenProfesorPage,
    PerfilEstudiantePage,
    ResetPasswordPage,
    NewEvaluationPage,
    RegisterPage,
    CrearInstCursoPage,
    NewTopicPage,
    RelAlumCursoPage,
    RendirExamenAlumnoPage,
    ResultadosExamenAlumnoPage,
    NotasProfesorPage,
    GenerarCodigoAccesoPage,
    ConsUpdEvPage,
    AddCoursePage,
    DeleteCoursePage,
    RegisterProfesorPage,
    HomeAlumnoPage,
    ConsUpdPregPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ExamenAlumnoPage,
    TimerPage,
    CrearExamenPage,
    CrearPreguntaPage,
    PerfilProfesorPage,
    ExamenProfesorPage,
    PerfilEstudiantePage,
    ResetPasswordPage,
    NewEvaluationPage,
    RegisterPage,
    CrearInstCursoPage,
    NewTopicPage,
    RelAlumCursoPage,
    RendirExamenAlumnoPage,
    ResultadosExamenAlumnoPage,
    NotasProfesorPage,
    GenerarCodigoAccesoPage,
    ConsUpdEvPage,
    AddCoursePage,
    DeleteCoursePage,
    RegisterProfesorPage,
    HomeAlumnoPage,
    ConsUpdPregPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginServiceProvider,
    ExamenServiceProvider,
    PreEvaluationServiceProvider,
    RegisterServiceProvider,
    LogOutServiceProvider,
    ResetPasswordServiceProvider,
    PreQuestionServiceProvider,
    InstanciaCursoProvider,
    NewTopicProvider,
    UserCourseProvider,
    NotaStudentProvider,
    CodigoAccesoProvider,
    ConsultarActualizarEvaluacionProvider,
    CrearCursoProvider,
    EliminarCursoProvider,
    RegistrarProfesorProvider,
    HabilitarExamenProvider,
    ConsularActualizarPreguntaProvider
  ],
  schemas:[
    ComponentsHeaderComponent
  ]
})
export class AppModule {}
