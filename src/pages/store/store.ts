import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { AuthProvider } from '../../providers/auth/auth';
import { ThankyouPage } from '../thankyou/thankyou'
import { LocatePage } from '../locate/locate'
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
  selectModel = [];
  qty=[];
  errors=[];
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
    this.priceIndex[index] = priceIndex;
    this.qty[index] = 1;
    this.itemPrice[index] = price*this.qty[index];
    this.validateQty(index, veg);
    this.calculateTotal()
  }

  calculateTotal(){
    this.total = 0;
    this.itemPrice.forEach((item, key) => {
      this.total =( parseInt(this.total) + parseInt(item));

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

  validateQty(index, veg){
    console.log(this.qty[index]);
    if(this.errors[index]){
      this.errors.splice(index, 1);
    }
    if(this.qty[index]){
      if(this.priceIndex[index] == 1){
        this.itemPrice[index] = veg.price1 * this.qty[index];
        if(this.qty[index]*.25 > veg.avail_stock){
          this.itemPrice[index] = this.itemPrice[index]*this.qty[index];
          this.errors[index] = "Sorry! Stock is not enough."
        }else{
          this.errors.splice(index, 1);
        }
      }else if(this.priceIndex[index] == 2){
        this.itemPrice[index] = veg.price2 * this.qty[index];
        if(this.qty[index]*.50 > veg.avail_stock){
          this.itemPrice[index] = this.itemPrice[index]*this.qty[index];
          this.errors[index] = "Sorry! Stock is not enough."
        }else{
          this.errors.splice(index, 1);
        }
      }else{
        this.itemPrice[index] = veg.price3 * this.qty[index];
        if(this.qty[index]*1 > veg.avail_stock){
          this.errors[index] = "Sorry! Stock is not enough."
        }else{
          this.errors.splice(index, 1);
        }
      }
    }else{
      this.errors[index] = "Quantity is required";
    }
    this.calculateTotal();

    console.log(this.errors);    
  }

  submit(){
    let items = this.items
    let itemsPrice = this.itemPrice
    let priceIndex = this.priceIndex
    let user = this.auth.getUserInfo();
    let store = this.store;
    let budget = this.budget;
    let total = this.total;
    let qty = this.qty;
    let postData = {items, itemsPrice, user, store, budget, priceIndex, total, qty};

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

  goToLocatePage(){
    let store = this.store;
    this.navCtrl.push(LocatePage, {store})
  }

}
