import { Component } from '@angular/core';
import { OrderProvider } from '../../providers/order/order'
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the OrdersComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'orders',
  templateUrl: 'orders.html'
})
export class OrdersComponent {

  text: string;
  orders: any;

  constructor(public alertCtrl: AlertController, public order: OrderProvider) {
    console.log(this.orders);
    this.getOrders();
    
  }

  getOrders(){
    this.order.getOrders().subscribe( res => {
      res.subscribe( res => {
        console.log(res.orders);
        this.orders = res.orders;
      })
    })
  }

  showActionAlert(vegetable){
    this.showAlert("What do you want to do?", '', [{
      'text': 'Delete',
      handler: () => {
        this.presentDeleteAlert(vegetable.id)
      } 
    }])
  }

  presentDeleteAlert(id){
    this.showAlert('Delete User', '', [{
      text: 'Cancel',
      handler: () => {

      }
    },{
      text: 'Delete',
      handler: () => {
        this.order.delete(id).subscribe( res => {
          this.getOrders();
        })
      }
    }])

  }

  showAlert(title, message, buttons){
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: buttons
    });

    alert.present();

    
  }

}
