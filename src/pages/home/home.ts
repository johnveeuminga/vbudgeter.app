import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login'
import { RegisterPage } from '../register/register'

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  goToSeller(){
    this.navCtrl.push(LoginPage, {module: 1})
  }

  goToCustomer(){
    this.navCtrl.push(LoginPage, {module: 2})
  }

  goToRegister(){
    this.navCtrl.push(RegisterPage)
  }
}
