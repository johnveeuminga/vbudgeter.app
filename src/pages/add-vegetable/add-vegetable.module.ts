import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddVegetablePage } from './add-vegetable';

@NgModule({
  declarations: [
    AddVegetablePage,
  ],
  imports: [
    IonicPageModule.forChild(AddVegetablePage),
  ],
})
export class AddVegetablePageModule {}
