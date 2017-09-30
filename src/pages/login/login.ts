import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home'
import { RegisterPage} from '../register/register'
import { SellerDashboardPage } from '../seller-dashboard/seller-dashboard'
import { CustomerDashboardPage } from '../customer-dashboard/customer-dashboard'
import { AuthProvider } from '../../providers/auth/auth'

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials = {username: '', password :''};
  processing = false;

  constructor(private auth: AuthProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.processing = false;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.processing = true;
    this.auth.login(this.credentials)
      .subscribe( data => {
        let token = data.access_token
        this.auth.getUser(data.access_token)
          .subscribe( data => {
            console.log(data);
            this.auth.setUser(data.user.email, data.user.id, data.user.name, data.user.username, data.user.address, data.user.contact, data.user.usertype, token, data.store);
            if(data.user.usertype_id == 1){
              this.goToSellerDashboard()
            }else if(data.user.usertype_id == 2){
              this.goToCustomerDashboard()
            }
          })
      },
      err => {
        this.showAlert("", err.message, ['Dismiss'])
      })
      this.processing = false;

  }

  showAlert(title, message, buttons){
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: buttons
    });

    alert.present();

    
  }

  goToSellerDashboard(){
    this.navCtrl.setRoot(SellerDashboardPage)
  }

  goToCustomerDashboard(){
    this.navCtrl.setRoot(CustomerDashboardPage)
  }


  goToHome(){
    this.navCtrl.setRoot(HomePage)
  }

  goToRegister(){
    this.navCtrl.push(RegisterPage)
  }

}
