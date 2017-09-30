var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { AuthProvider } from '../../providers/auth/auth';
import { ThankyouPage } from '../thankyou/thankyou';
import { LocatePage } from '../locate/locate';
/**
 * Generated class for the StorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var StorePage = (function () {
    function StorePage(auth, order, navCtrl, navParams) {
        this.auth = auth;
        this.order = order;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.items = [];
        this.itemPrice = [];
        this.priceIndex = [];
        this.selectModel = [];
        this.qty = [];
        this.errors = [];
        this.store = this.navParams.get('store');
        console.log(this.store);
    }
    StorePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StorePage');
    };
    StorePage.prototype.itemSelected = function (veg, price, index, priceIndex) {
        this.items[index] = veg;
        console.log(this.items);
        this.itemPrice[index] = price;
        this.priceIndex[index] = priceIndex;
        this.qty[index] = 1;
        this.calculateTotal();
    };
    StorePage.prototype.calculateTotal = function () {
        var _this = this;
        this.total = 0;
        this.itemPrice.forEach(function (item) {
            _this.total = parseInt(_this.total) + parseInt(item);
            console.log(_this.total);
        });
    };
    StorePage.prototype.checkBudget = function () {
        if (this.budget) {
            if (this.total > parseInt(this.budget)) {
                return false;
            }
            else {
                return true;
            }
        }
        return false;
    };
    StorePage.prototype.validateQty = function (index, veg) {
        console.log(this.qty[index]);
        if (this.qty[index]) {
            if (this.priceIndex[index] == 1) {
                if (this.qty[index] * .25 > veg.avail_stock) {
                    this.errors[index] = "Quantity greater than available stock.";
                }
            }
            else if (this.priceIndex[index] == 2) {
                if (this.qty[index] * .50 > veg.avail_stock) {
                    console.log("Over stock");
                }
                else {
                    console.log("True");
                }
            }
            else {
                if (this.qty[index] * 1 > veg.avail_stock) {
                    console.log("Over stock");
                }
                else {
                    console.log("True");
                }
            }
        }
        else {
            this.errors[index] = "No quantity inputted";
        }
    };
    StorePage.prototype.submit = function () {
        var _this = this;
        var items = this.items;
        var itemsPrice = this.itemPrice;
        var priceIndex = this.priceIndex;
        var user = this.auth.getUserInfo();
        var store = this.store;
        var budget = this.budget;
        var total = this.total;
        var postData = { items: items, itemsPrice: itemsPrice, user: user, store: store, budget: budget, priceIndex: priceIndex, total: total };
        console.log(postData);
        this.order.store(postData).subscribe(function (res) {
            _this.goToThankYou();
        }, function (err) {
            console.log(err);
        });
    };
    StorePage.prototype.goToThankYou = function () {
        this.navCtrl.setRoot(ThankyouPage);
    };
    StorePage.prototype.goToLocatePage = function () {
        var store = this.store;
        this.navCtrl.push(LocatePage, { store: store });
    };
    return StorePage;
}());
StorePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-store',
        templateUrl: 'store.html',
    }),
    __metadata("design:paramtypes", [AuthProvider, OrderProvider, NavController, NavParams])
], StorePage);
export { StorePage };
//# sourceMappingURL=store.js.map