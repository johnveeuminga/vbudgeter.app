import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth'

import { HomePage } from '../home/home'
import { StorePage } from '../store/store'
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
  stores= [{name:"Store 1", vegetables: [{name: "vegetable_1", price_1: 10, price_2:20, price_3: 40}, {name: "vegetable_2", price_1: 10, price_2:20, price_3: 40}, {name: "vegetable_4", price_1: 10, price_2:20, price_3: 40}]}, 
  {name:"Store 2", vegetables: [{name: "vegetable_1", price_1: 15, price_2:25, price_3: 45}, {name: "vegetable_2", price_1: 54, price_2:67, price_3: 89}, {name: "vegetable_5", price_1: 10, price_2:20, price_3: 40}]}, 
  {name:"Store 3", vegetables: [{name: "vegetable_1", price_1: 10, price_2:20, price_3: 40}, {name: "vegetable_2", price_1: 10, price_2:20, price_3: 40}, {name: "vegetable_1", price_1: 10, price_2:20, price_3: 40}]}, 
  {name:"Store 4", vegetables: [{name: "vegetable_1", price_1: 12, price_2:24, price_3: 45}, {name: "vegetable_2", price_1: 60, price_2:70, price_3: 89}, {name: "vegetable_5", price_1: 10, price_2:20, price_3: 40}]}, 
  {name:"Store 5", vegetables: [{name: "vegetable_1", price_1: 10, price_2:20, price_3: 40}, {name: "vegetable_2", price_1: 30, price_2:45, price_3: 20}, {name: "vegetable_1", price_1: 5, price_2:15, price_3: 30}]}]
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

  goToStore(store){
    this.navCtrl.push(StorePage, {store})
  }

}
