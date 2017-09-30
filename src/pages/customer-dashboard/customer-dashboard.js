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
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { StoreProvider } from '../../providers/store/store';
import { LoginPage } from '../login/login';
import { StorePage } from '../store/store';
/**
 * Generated class for the CustomerDashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CustomerDashboardPage = (function () {
    function CustomerDashboardPage(storeCtrl, actionSheetCtrl, auth, navCtrl, navParams) {
        var _this = this;
        this.storeCtrl = storeCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.auth = auth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user = this.auth.getUserInfo();
        this.storeCtrl.getAllStores()
            .subscribe(function (data) {
            console.log(data.data);
            _this.stores = data.data;
        });
    }
    CustomerDashboardPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: "Menu",
            buttons: [
                {
                    text: "Logout",
                    handler: function () {
                        _this.auth.logout();
                        _this.navCtrl.push(LoginPage);
                    }
                }
            ]
        });
        actionSheet.present();
    };
    CustomerDashboardPage.prototype.goToStore = function (store) {
        this.navCtrl.push(StorePage, { store: store });
    };
    return CustomerDashboardPage;
}());
CustomerDashboardPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-customer-dashboard',
        templateUrl: 'customer-dashboard.html',
    }),
    __metadata("design:paramtypes", [StoreProvider, ActionSheetController, AuthProvider, NavController, NavParams])
], CustomerDashboardPage);
export { CustomerDashboardPage };
//# sourceMappingURL=customer-dashboard.js.map