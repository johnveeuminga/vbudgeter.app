import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth'
import { SellerDashboardPage } from '../seller-dashboard/seller-dashboard'
import { CustomerDashboardPage } from '../customer-dashboard/customer-dashboard'


/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  credentials = {email: '', username: '', name: '', password :'', address: '', contact: '', usertype: 1};
  
  constructor(public auth: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    this.auth.store(this.credentials).then( (res:any) => {
      this.auth.setUser(this.credentials.email, res.insertId, this.credentials.name, this.credentials.username, this.credentials.address, this.credentials.contact, this.credentials.usertype)      
      if(parseInt(this.credentials.usertype.toString()) === 1){
        this.navCtrl.setRoot(SellerDashboardPage)
        console.log('qweqweq')
      }else if(parseInt(this.credentials.usertype.toString()) === 2){
        this.navCtrl.setRoot(CustomerDashboardPage)
      }
    }).catch( err => {
      console.log(err)
    })
  }

}
