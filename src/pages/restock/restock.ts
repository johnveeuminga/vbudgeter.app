import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { SellerDashboardPage } from '../seller-dashboard/seller-dashboard'


import { VegetableProvider } from '../../providers/vegetable/vegetable'

/**
 * Generated class for the RestockPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-restock',
  templateUrl: 'restock.html',
})
export class RestockPage {

	veg: any;

  constructor(private vegCtrl: VegetableProvider, private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  	this.veg = this.navParams.get('veg');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestockPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  restock(){
  	this.vegCtrl.edit(this.veg, this.veg.id).subscribe( res => {
      let store = res.store;
  		this.navCtrl.setRoot(SellerDashboardPage, {action:"add"})
  	}, err => {
  		console.log(err)
  	})
  }

}
