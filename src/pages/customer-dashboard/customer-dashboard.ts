import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth'

import { HomePage } from '../home/home'

/**
 * Generated class for the CustomerDashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-dashboard',
  templateUrl: 'customer-dashboard.html',
})
export class CustomerDashboardPage {

  user: any;
  constructor(private actionSheetCtrl: ActionSheetController, private auth: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.auth.getUserInfo();
  }
  
  presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: "Menu",
      buttons: [
      {
        text: "Logout",
        handler: () => {
          this.auth.logout();
          this.navCtrl.push(HomePage);
        }
      }]
    })

    actionSheet.present();
  }

}
