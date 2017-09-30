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
 * Generated class for the RestockPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var RestockPage = (function () {
    function RestockPage(vegCtrl, viewCtrl, navCtrl, navParams) {
        this.vegCtrl = vegCtrl;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.veg = this.navParams.get('veg');
    }
    RestockPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RestockPage');
    };
    RestockPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    RestockPage.prototype.restock = function () {
        var _this = this;
        this.vegCtrl.edit(this.veg, this.veg.id).subscribe(function (res) {
            var store = res.store;
            _this.navCtrl.setRoot(SellerDashboardPage, { action: "add" });
        }, function (err) {
            console.log(err);
        });
    };
    return RestockPage;
}());
RestockPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-restock',
        templateUrl: 'restock.html',
    }),
    __metadata("design:paramtypes", [VegetableProvider, ViewController, NavController, NavParams])
], RestockPage);
export { RestockPage };
//# sourceMappingURL=restock.js.map