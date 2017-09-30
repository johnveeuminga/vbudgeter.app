var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DirectionsPage } from '../directions/directions';
var LocatePage = (function () {
    function LocatePage(actionSheet, loc, navCtrl, navParams) {
        this.actionSheet = actionSheet;
        this.loc = loc;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.store = this.navParams.get("store");
        this.latLng = new google.maps.LatLng(this.store.latitude, this.store.longitude);
    }
    LocatePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LocatePage');
        this.loadMap();
    };
    LocatePage.prototype.loadMap = function () {
        var _this = this;
        this.loc.getCurrentPosition({ enableHighAccuracy: true })
            .then(function (pos) {
            var currentPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            var mapOptions = {
                center: _this.latLng,
                zoom: 18,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
            var selfMarker = new google.maps.Marker({
                map: _this.map,
                position: currentPos,
                icon: "http://www.google.com/mapfiles/dd-start.png"
            });
            var storeMarker = new google.maps.Marker({
                map: _this.map,
                position: _this.latLng
            });
        });
    };
    LocatePage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheet.create({
            title: 'Select mode of transportation',
            buttons: [
                {
                    text: "Walking",
                    icon: "walk",
                    handler: function () {
                        _this.goToDirectionsPage(1);
                    }
                },
                {
                    text: "Driving",
                    icon: "car",
                    handler: function () {
                        _this.goToDirectionsPage(2);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    icon: 'close',
                }
            ]
        });
        actionSheet.present();
    };
    LocatePage.prototype.goToDirectionsPage = function (mode, store) {
        if (store === void 0) { store = { store_name: "Store 1" }; }
        var destination = this.latLng;
        this.navCtrl.push(DirectionsPage, { mode: mode, destination: destination });
    };
    return LocatePage;
}());
__decorate([
    ViewChild('map'),
    __metadata("design:type", ElementRef)
], LocatePage.prototype, "mapElement", void 0);
LocatePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-locate',
        templateUrl: 'locate.html',
    }),
    __metadata("design:paramtypes", [ActionSheetController, Geolocation, NavController, NavParams])
], LocatePage);
export { LocatePage };
//# sourceMappingURL=locate.js.map