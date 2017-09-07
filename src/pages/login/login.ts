import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home'
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

  constructor(private auth: AuthProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.auth.login(this.credentials).then((res:any) => {
      console.log(res)
      if(this.navParams.get('module') === 1){
        if(res.usertype === 1){
          this.goToSellerDashboard()
        }else{
          this.showAlert('', 'The credentials you entered seems to be existing but is not a seller. Please try again.', ['Dismiss'])
        }
      }else{
        if(res.usertype === 2){
          this.goToCustomerDashboard()
        }else{
          this.showAlert('', 'The credentials you entered seems to be existing but is not a customer. Please try again.', ['Dismiss'])
        }
      }
      
    }).catch( err => {
      this.showAlert("", err, ['Dismiss']);
    })
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

}
