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
  selector: 'page-edit-vegetable',
  templateUrl: 'edit-vegetable.html',
})
export class EditVegetablePage {

	veg = {name: "", price1:null, price2:null, price3:null , store_id: null, avail_stock: null};
	vegRec:any;
	store:any;

  constructor(public vegCtrl: VegetableProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  	this.store = this.navParams.get("store");
  	this.vegRec = this.navParams.get("veg");
  	console.log(this.vegRec);
  	this.veg.name = this.vegRec.name;
  	this.veg.price1 = this.vegRec.price1;
  	this.veg.price2 = this.vegRec.price2;
  	this.veg.price3 = this.vegRec.price3;
  	this.veg.store_id = this.store.id;
    this.veg.avail_stock = this.vegRec.avail_stock;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddVegetablePage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  add(){
  	this.vegCtrl.edit(this.veg, this.vegRec.id).subscribe( res => {
      let store = this.store;
  		this.navCtrl.setRoot(SellerDashboardPage, {action:"edit", store})
  	}, err => {
  		console.log(err)
  	})
  }

}
