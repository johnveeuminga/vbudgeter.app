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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { StoreProvider } from '../../providers/store/store';
import { SellerDashboardPage } from '../seller-dashboard/seller-dashboard';
var LocationPage = (function () {
    function LocationPage(storeProv, loc, navCtrl, navParams) {
        this.storeProv = storeProv;
        this.loc = loc;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.newLatLng = { latitude: null, longitude: null };
        this.store = this.navParams.get('store');
    }
    LocationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LocationPage');
        this.loadMap();
    };
    LocationPage.prototype.loadMap = function () {
        var _this = this;
        if (this.store.latitude) {
            this.latLng = new google.maps.LatLng(this.store.latitude, this.store.longitude);
            var mapOptions = {
                center: this.latLng,
                zoom: 18,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
            this.map.addListener('click', function (res) {
                _this.moveMarker(res);
            });
            this.marker = new google.maps.Marker({
                map: this.map,
                position: this.latLng
            });
        }
        else {
            this.loc.getCurrentPosition({ enableHighAccuracy: true })
                .then(function (pos) {
                _this.latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                var mapOptions = {
                    center: _this.latLng,
                    zoom: 18,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
                _this.map.addListener('click', function (res) {
                    _this.moveMarker(res);
                });
            });
        }
    };
    LocationPage.prototype.moveMarker = function (pos) {
        this.newLatLng.latitude = pos.latLng.lat();
        this.newLatLng.longitude = pos.latLng.lng();
        if (this.marker == undefined) {
            this.marker = new google.maps.Marker({
                map: this.map,
                position: pos.latLng,
            });
        }
        else {
            this.marker.setPosition(pos.latLng);
        }
        this.map.setCenter(pos.latLng);
        console.log(this.newLatLng);
    };
    LocationPage.prototype.editLocation = function () {
        var _this = this;
        console.log(this.newLatLng);
        this.storeProv.setLocation(this.store.id, this.newLatLng).subscribe(function (res) {
            var store = res.store;
            _this.navCtrl.setRoot(SellerDashboardPage, { action: "edit", store: store });
        });
    };
    return LocationPage;
}());
__decorate([
    ViewChild('map'),
    __metadata("design:type", ElementRef)
], LocationPage.prototype, "mapElement", void 0);
LocationPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-location',
        templateUrl: 'location.html',
    }),
    __metadata("design:paramtypes", [StoreProvider, Geolocation, NavController, NavParams])
], LocationPage);
export { LocationPage };
//# sourceMappingURL=location.js.map