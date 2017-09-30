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
var EditVegetablePage = (function () {
    function EditVegetablePage(vegCtrl, navCtrl, navParams, viewCtrl) {
        this.vegCtrl = vegCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.veg = { name: "", price1: null, price2: null, price3: null, store_id: null, avail_stock: null };
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
    EditVegetablePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddVegetablePage');
    };
    EditVegetablePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    EditVegetablePage.prototype.add = function () {
        var _this = this;
        this.vegCtrl.edit(this.veg, this.vegRec.id).subscribe(function (res) {
            var store = _this.store;
            _this.navCtrl.setRoot(SellerDashboardPage, { action: "edit", store: store });
        }, function (err) {
            console.log(err);
        });
    };
    return EditVegetablePage;
}());
EditVegetablePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-edit-vegetable',
        templateUrl: 'edit-vegetable.html',
    }),
    __metadata("design:paramtypes", [VegetableProvider, NavController, NavParams, ViewController])
], EditVegetablePage);
export { EditVegetablePage };
//# sourceMappingURL=edit-vegetable.js.map