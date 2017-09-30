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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SellerDashboardPage } from '../seller-dashboard/seller-dashboard';
import { VegetableProvider } from '../../providers/vegetable/vegetable';
/**
 * Generated class for the AddVegetablePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddVegetablePage = (function () {
    function AddVegetablePage(vegCtrl, navCtrl, navParams, viewCtrl) {
        this.vegCtrl = vegCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.veg = { name: "", price1: null, price2: null, price3: null, store_id: null, avail_stock: null };
        this.store = this.navParams.get("store");
        console.log(this.store);
        this.veg.store_id = this.store.id;
    }
    AddVegetablePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddVegetablePage');
    };
    AddVegetablePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    AddVegetablePage.prototype.add = function () {
        var _this = this;
        this.vegCtrl.store(this.veg).subscribe(function (res) {
            var store = res.store;
            _this.navCtrl.setRoot(SellerDashboardPage, { action: "add" });
        }, function (err) {
            console.log(err);
        });
    };
    return AddVegetablePage;
}());
AddVegetablePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-add-vegetable',
        templateUrl: 'add-vegetable.html',
    }),
    __metadata("design:paramtypes", [VegetableProvider, NavController, NavParams, ViewController])
], AddVegetablePage);
export { AddVegetablePage };
//# sourceMappingURL=add-vegetable.js.map