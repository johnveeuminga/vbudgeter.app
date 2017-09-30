import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditVegetablePage } from './edit-vegetable';

@NgModule({
  declarations: [
    EditVegetablePage,
  ],
  imports: [
    IonicPageModule.forChild(EditVegetablePage),
  ],
})
export class EditVegetablePageModule {}
