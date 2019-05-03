import { NgModule } from '@angular/core';
import { MenuController } from 'ionic-angular';

@NgModule({
  declarations: [

  ],
  imports: [

  ],
})
export class ExamenAlumnoPageModule {
  constructor(
    public menuCtrl: MenuController) {
this.menuCtrl.enable(true,'MenuStudent');
this.menuCtrl.enable(false,'MenuTeacher');
    }
}
