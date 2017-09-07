import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellerDashboardPage } from './seller-dashboard';

@NgModule({
  declarations: [
    SellerDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(SellerDashboardPage),
  ],
})
export class SellerDashboardPageModule {}
