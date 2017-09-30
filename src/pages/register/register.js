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
import { AuthProvider } from '../../providers/auth/auth';
import { UserProvider } from '../../providers/user/user';
import { SellerDashboardPage } from '../seller-dashboard/seller-dashboard';
import { CustomerDashboardPage } from '../customer-dashboard/customer-dashboard';
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var RegisterPage = (function () {
    function RegisterPage(user, auth, navCtrl, navParams) {
        this.user = user;
        this.auth = auth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.credentials = { email: '', username: '', name: '', password: '', address: '', contact_info: '', usertype_id: 1 };
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.register = function () {
        var _this = this;
        this.user.store(this.credentials)
            .subscribe(function (data) {
            _this.auth.setUser(data.data.email, data.data.id, data.data.name, data.data.username, data.data.address, data.data.contact, data.data.usertype_id, "", null);
            if (data.data.usertype_id == 1) {
                _this.goToSellerDashboard();
            }
            else if (data.data.usertype_id == 2) {
                _this.goToCustomerDashboard();
            }
        }, function (err) {
            _this.errors = err.errors;
            console.log(_this.errors);
        });
    };
    RegisterPage.prototype.goToSellerDashboard = function () {
        this.navCtrl.setRoot(SellerDashboardPage);
    };
    RegisterPage.prototype.goToCustomerDashboard = function () {
        this.navCtrl.setRoot(CustomerDashboardPage);
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-register',
        templateUrl: 'register.html',
    }),
    __metadata("design:paramtypes", [UserProvider, AuthProvider, NavController, NavParams])
], RegisterPage);
export { RegisterPage };
//# sourceMappingURL=register.js.map