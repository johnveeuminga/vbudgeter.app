import { Component } from '@angular/core';

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
  orders = [{customer: {name: "customer sample"}, items: [{item:{name:"sample_item_1", price:10}, quantity: 2}, {item: {name:"sample_item_2", price: 20}, quantity: 3}]},
  {customer: {name: "customer sample 2"}, items: [{item:{name:"sample_item_1", price:10}, quantity: 2}, {item: {name:"sample_item_2", price: 20}, quantity: 3}]}]

  constructor() {
    console.log(this.orders);
  }

}
