import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestockPage } from './restock';

@NgModule({
  declarations: [
    RestockPage,
  ],
  imports: [
    IonicPageModule.forChild(RestockPage),
  ],
})
export class RestockPageModule {}
