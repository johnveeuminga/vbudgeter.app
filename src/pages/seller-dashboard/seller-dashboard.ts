import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth'

import { LoginPage } from '../login/login'

import { OrdersComponent } from '../../components/orders/orders'
/**
 * Generated class for the SellerDashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-seller-dashboard',
  templateUrl: 'seller-dashboard.html',
})
export class SellerDashboardPage {

  user: any;
  constructor(private actionSheetCtrl: ActionSheetController, private auth: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.auth.getUserInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerDashboardPage');
  }

  presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: "Menu",
      buttons: [
      {
        text: "Logout",
        handler: () => {
          this.auth.logout();
          this.navCtrl.push(LoginPage);
        }
      }]
    })

    actionSheet.present();
  }

}
