import { Component, ViewChild, ElementRef } from '@angular/core';
import { Content, IonicPage, NavController, NavParams, ActionSheetController, AlertController, ModalController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth'
import { StoreProvider } from '../../providers/store/store'
import { VegetableProvider } from '../../providers/vegetable/vegetable'
import { Geolocation } from '@ionic-native/geolocation'
import { AddVegetablePage } from '../add-vegetable/add-vegetable'
import { EditVegetablePage } from '../edit-vegetable/edit-vegetable'
import { LocationPage } from '../location/location'
import { RestockPage } from '../restock/restock'
import { LoginPage } from '../login/login'

import { OrdersComponent } from '../../components/orders/orders'
/**
 * Generated class for the SellerDashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-seller-dashboard',
  templateUrl: 'seller-dashboard.html',
})
export class SellerDashboardPage {
  @ViewChild(Content) content: Content;
  map:any;
  user: any;
  action:any;
  store:any;
  oldTitle: string;
  titleFocused = false;
  storeMarker: any;
  storeLoc: any;
  oldDesc:any;
  descFocused = false;

  ionScroll;
  showButton = false;
  contentData = [];

  constructor(private myElement: ElementRef, private loc: Geolocation, private modalCtrl: ModalController, private veg: VegetableProvider, private alert: AlertController, private storeCtrl: StoreProvider, private actionSheetCtrl: ActionSheetController, private auth: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.auth.getUserInfo();
    if(this.navParams.get("action")){
      this.action = 'store'
    }else{
      this.action = 'orders'
    }
    if(this.navParams.get('action')){
      this.storeCtrl.getSellerStore(this.user.id).subscribe( res => {
        this.store = res;  
        this.oldTitle = this.store.store_name;
        this.oldDesc = this.store.store_desc;
        console.log(this.store);
      });
    }else{
      this.store = this.user.store;
      this.oldTitle = this.store.store_name;
    }    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellerDashboardPage');


  }

  presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: "Menu",
      buttons: [
      {
        text: "Logout",
        handler: () => {
          this.auth.logout();
          this.navCtrl.push(LoginPage);
        }
      }]
    })

    actionSheet.present();
  }

  showVegAction(veg){
    this.showAlert("What do you want to do?", "", [
    {
      text: 'EDIT',
      handler: () => {
        this.openEditModal(veg);
      }
    },
    {
      text: 'RESTOCK',
      handler: () => {
        this.openRestockModal(veg);
      }
    },
    {
      text: 'DELETE',
      handler: () => {
        this.showAlert("DELETE VEGETABLE?", "This process is irreversible", [
        {
           text: 'DELETE',
           handler: () => {
             this.veg.delete(veg.id).subscribe( () => {
               this.storeCtrl.getSellerStore(this.user.id).subscribe( res => {
                 this.store = res;  
                 this.oldTitle = this.store.store_name;
               })
             })  
           }
        },
        {
          text: 'CANCEL',
          handler: () => {

          }
        }])
      }
    }])
  }

  showAlert(title, message, buttons){
    let alert = this.alert.create({
      title: title,
      message: message,
      buttons: buttons
    });

    alert.present();

    
  }

  openAddModal(){
    let store = this.store
    let modal = this.modalCtrl.create(AddVegetablePage, {store});
    modal.present();
  }

  openEditModal(veg){
    let store = this.store
    let modal = this.modalCtrl.create(EditVegetablePage, {store, veg});
    modal.present();
  }

  openRestockModal(veg){
    let store = this.store
    let modal = this.modalCtrl.create(RestockPage, {store, veg});
    modal.present();
  }

  checkIfChanged(){
    if(this.oldTitle === this.store.store_name){
      console.log(true);
    }
  }

  submit(){
    let store_name = this.store.store_name;
    let store_desc = this.store.store_desc;
    let data = {'store_name': store_name, 'store_desc': store_desc}

    this.storeCtrl.edit(data, this.store.id).subscribe(res => {
      this.store = res.store;
      this.oldTitle = this.store.store_name
      console.log(res.store)
    })
  }

  titleFocus(event){
    this.titleFocused = true;
  }

  titleBlur(event){
    this.titleFocused = false;

  }

  descFocus(event){
    this.descFocused = true;
  }

  descBlur(event){
    this.descFocused = false;

  }

  titleChange(){
    return false;
  }

  storeView(){

  }

  goToLocation(){
    let store = this.store;
    this.navCtrl.push(LocationPage, {store})
  }

  scrollToTop() {
    this.content.scrollToTop();
  }


}
