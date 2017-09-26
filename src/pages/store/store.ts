import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { AuthProvider } from '../../providers/auth/auth';
import { ThankyouPage } from '../thankyou/thankyou'
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
  priceIndex = [];
  budget:any;
  constructor(private auth: AuthProvider, public order: OrderProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.store = this.navParams.get('store');
    console.log(this.store);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StorePage');
  }

  itemSelected(veg, price, index, priceIndex){
    this.items[index] = veg;
    console.log(this.items);
    this.itemPrice[index] = price;
    this.priceIndex[index] = priceIndex;
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
    let items = this.items
    let itemsPrice = this.itemPrice
    let priceIndex = this.priceIndex
    let user = this.auth.getUserInfo();
    let store = this.store;
    let budget = this.budget;
    let total = this.total;
    let postData = {items, itemsPrice, user, store, budget, priceIndex, total};

    console.log(postData);

    this.order.store(postData).subscribe( res => {
      this.goToThankYou();
    }, err => {
      console.log(err);
    })
  }

  goToThankYou(){
    this.navCtrl.setRoot(ThankyouPage);
  }

}
