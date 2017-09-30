import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth'
import { UserProvider } from '../../providers/user/user'
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

  credentials = {email: '', username: '', name: '', password :'', address: '', contact_info: '', usertype_id: 1};
  errors: any;
  
  constructor(private user: UserProvider, public auth: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    this.user.store(this.credentials)
      .subscribe( data => {
        this.auth.setUser(data.data.email, data.data.id, data.data.name, data.data.username, data.data.address, data.data.contact, data.data.usertype_id, "", null)
        if(data.data.usertype_id == 1){
          this.goToSellerDashboard()
        }else if(data.data.usertype_id == 2){
          this.goToCustomerDashboard()
        }
      }, err => {
          this.errors = err.errors
          console.log(this.errors)
         
      })
  }

  goToSellerDashboard(){
    this.navCtrl.setRoot(SellerDashboardPage)
  }

  goToCustomerDashboard(){
    this.navCtrl.setRoot(CustomerDashboardPage)
  }



}
