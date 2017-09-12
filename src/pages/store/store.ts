import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {
  
  store: any;
  items= [];
  total:any;
  itemPrice = [];
  budget:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.store = this.navParams.get('store');
    console.log(this.store);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StorePage');
  }

  itemSelected(veg, price, index){
    this.itemPrice[index] = price;
    this.calculateTotal()
  }

  calculateTotal(){
    this.total = 0;
    this.itemPrice.forEach(item => {
      this.total = parseInt(this.total) + parseInt(item);

      console.log(this.total);
    })
  }

  checkBudget(){
    console.log(this.budget)
    if(this.budget)
    {
      if(this.total > parseInt(this.budget)){
        return false;
      }else{
        return true;
      }      
    }

    return false
  }

  submit(){

  }

  goToThankYou(){
    
  }

}
