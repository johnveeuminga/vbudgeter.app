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
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { SellerDashboardPage } from '../seller-dashboard/seller-dashboard';
import { CustomerDashboardPage } from '../customer-dashboard/customer-dashboard';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(auth, alertCtrl, navCtrl, navParams) {
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.credentials = { username: '', password: '' };
        this.processing = false;
        this.processing = false;
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.processing = true;
        this.auth.login(this.credentials)
            .subscribe(function (data) {
            var token = data.access_token;
            _this.auth.getUser(data.access_token)
                .subscribe(function (data) {
                console.log(data);
                _this.auth.setUser(data.user.email, data.user.id, data.user.name, data.user.username, data.user.address, data.user.contact, data.user.usertype, token, data.store);
                if (data.user.usertype_id == 1) {
                    _this.goToSellerDashboard();
                }
                else if (data.user.usertype_id == 2) {
                    _this.goToCustomerDashboard();
                }
            });
        }, function (err) {
            _this.showAlert("", err.message, ['Dismiss']);
        });
        this.processing = false;
    };
    LoginPage.prototype.showAlert = function (title, message, buttons) {
        var alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: buttons
        });
        alert.present();
    };
    LoginPage.prototype.goToSellerDashboard = function () {
        this.navCtrl.setRoot(SellerDashboardPage);
    };
    LoginPage.prototype.goToCustomerDashboard = function () {
        this.navCtrl.setRoot(CustomerDashboardPage);
    };
    LoginPage.prototype.goToHome = function () {
        this.navCtrl.setRoot(HomePage);
    };
    LoginPage.prototype.goToRegister = function () {
        this.navCtrl.push(RegisterPage);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
    }),
    __metadata("design:paramtypes", [AuthProvider, AlertController, NavController, NavParams])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map