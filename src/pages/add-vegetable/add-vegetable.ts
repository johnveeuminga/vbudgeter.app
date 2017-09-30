import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { SellerDashboardPage } from'../seller-dashboard/seller-dashboard'
import { VegetableProvider } from '../../providers/vegetable/vegetable'

/**
 * Generated class for the AddVegetablePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-vegetable',
  templateUrl: 'add-vegetable.html',
})
export class AddVegetablePage {

	veg = {name: "", price1:null, price2:null, price3:null , store_id: null, avail_stock: null};
	store:any;

  constructor(public vegCtrl: VegetableProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  	this.store = this.navParams.get("store");
  	console.log(this.store);
  	this.veg.store_id = this.store.id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddVegetablePage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  add(){
  	this.vegCtrl.store(this.veg).subscribe( res => {
      let store = res.store;
  		this.navCtrl.setRoot(SellerDashboardPage, {action:"add"})
  	}, err => {
  		console.log(err)
  	})
  }

}
