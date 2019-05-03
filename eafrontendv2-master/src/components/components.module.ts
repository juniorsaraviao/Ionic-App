import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { AutosizeComponent } from './autosize/autosize';
import { ComponentsHeaderComponent } from './components-header/components-header';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [AutosizeComponent,
    ComponentsHeaderComponent],
	imports: [IonicModule,CommonModule],
	exports: [AutosizeComponent,
    ComponentsHeaderComponent]
})
export class ComponentsModule {}
