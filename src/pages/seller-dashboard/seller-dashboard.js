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
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ModalController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { StoreProvider } from '../../providers/store/store';
import { VegetableProvider } from '../../providers/vegetable/vegetable';
import { Geolocation } from '@ionic-native/geolocation';
import { AddVegetablePage } from '../add-vegetable/add-vegetable';
import { EditVegetablePage } from '../edit-vegetable/edit-vegetable';
import { LocationPage } from '../location/location';
import { RestockPage } from '../restock/restock';
import { LoginPage } from '../login/login';
var SellerDashboardPage = (function () {
    function SellerDashboardPage(loc, modalCtrl, veg, alert, storeCtrl, actionSheetCtrl, auth, navCtrl, navParams) {
        var _this = this;
        this.loc = loc;
        this.modalCtrl = modalCtrl;
        this.veg = veg;
        this.alert = alert;
        this.storeCtrl = storeCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.auth = auth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.titleFocused = false;
        this.user = this.auth.getUserInfo();
        if (this.navParams.get("action")) {
            this.action = 'store';
        }
        else {
            this.action = 'orders';
        }
        if (this.navParams.get('action')) {
            this.storeCtrl.getSellerStore(this.user.id).subscribe(function (res) {
                _this.store = res;
                _this.oldTitle = _this.store.store_name;
                console.log(_this.store);
            });
        }
        else {
            this.store = this.user.store;
            this.oldTitle = this.store.store_name;
        }
    }
    SellerDashboardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SellerDashboardPage');
    };
    SellerDashboardPage.prototype.presentActionSheet = function () {
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
    SellerDashboardPage.prototype.showVegAction = function (veg) {
        var _this = this;
        this.showAlert("What do you want to do?", "", [
            {
                text: 'EDIT',
                handler: function () {
                    _this.openEditModal(veg);
                }
            },
            {
                text: 'RESTOCK',
                handler: function () {
                    _this.openRestockModal(veg);
                }
            },
            {
                text: 'DELETE',
                handler: function () {
                    _this.showAlert("DELETE VEGETABLE?", "This process is irreversible", [
                        {
                            text: 'DELETE',
                            handler: function () {
                                _this.veg.delete(veg.id).subscribe(function () {
                                    _this.storeCtrl.getSellerStore(_this.user.id).subscribe(function (res) {
                                        _this.store = res;
                                        _this.oldTitle = _this.store.store_name;
                                    });
                                });
                            }
                        },
                        {
                            text: 'CANCEL',
                            handler: function () {
                            }
                        }
                    ]);
                }
            }
        ]);
    };
    SellerDashboardPage.prototype.showAlert = function (title, message, buttons) {
        var alert = this.alert.create({
            title: title,
            message: message,
            buttons: buttons
        });
        alert.present();
    };
    SellerDashboardPage.prototype.openAddModal = function () {
        var store = this.store;
        var modal = this.modalCtrl.create(AddVegetablePage, { store: store });
        modal.present();
    };
    SellerDashboardPage.prototype.openEditModal = function (veg) {
        var store = this.store;
        var modal = this.modalCtrl.create(EditVegetablePage, { store: store, veg: veg });
        modal.present();
    };
    SellerDashboardPage.prototype.openRestockModal = function (veg) {
        var store = this.store;
        var modal = this.modalCtrl.create(RestockPage, { store: store, veg: veg });
        modal.present();
    };
    SellerDashboardPage.prototype.checkIfChanged = function () {
        if (this.oldTitle === this.store.store_name) {
            console.log(true);
        }
    };
    SellerDashboardPage.prototype.submit = function () {
        var _this = this;
        var store_name = this.store.store_name;
        var data = { 'store_name': store_name };
        this.storeCtrl.edit(data, this.store.id).subscribe(function (res) {
            _this.store = res.store;
            _this.oldTitle = _this.store.store_name;
            console.log(res.store);
        });
    };
    SellerDashboardPage.prototype.titleFocus = function (event) {
        this.titleFocused = true;
    };
    SellerDashboardPage.prototype.titleBlur = function (event) {
        this.titleFocused = false;
    };
    SellerDashboardPage.prototype.titleChange = function () {
        return false;
    };
    SellerDashboardPage.prototype.storeView = function () {
    };
    SellerDashboardPage.prototype.goToLocation = function () {
        var store = this.store;
        this.navCtrl.push(LocationPage, { store: store });
    };
    return SellerDashboardPage;
}());
SellerDashboardPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-seller-dashboard',
        templateUrl: 'seller-dashboard.html',
    }),
    __metadata("design:paramtypes", [Geolocation, ModalController, VegetableProvider, AlertController, StoreProvider, ActionSheetController, AuthProvider, NavController, NavParams])
], SellerDashboardPage);
export { SellerDashboardPage };
//# sourceMappingURL=seller-dashboard.js.map