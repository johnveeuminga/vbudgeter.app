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
var DirectionsPage = (function () {
    function DirectionsPage(loc, navCtrl, navParams) {
        this.loc = loc;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.markers = [];
        var mode = this.navParams.get('mode');
        if (mode == 1) {
            this.mode = "WALKING";
        }
        else {
            this.mode = "DRIVING";
        }
        this.store = this.navParams.get('store');
        console.log(this.store);
        this.dest = this.navParams.get('destination');
    }
    DirectionsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DirectionsPage');
        this.loadMap();
        this.watchLoc();
    };
    DirectionsPage.prototype.loadMap = function () {
        var _this = this;
        this.loc.getCurrentPosition({
            enableHighAccuracy: true
        }).then(function (pos) {
            var latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            var mapOptions = {
                center: latLng,
                zoom: 18,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            directionsDisplay.setMap(_this.map);
            directionsService.route({
                origin: latLng,
                destination: _this.dest,
                travelMode: _this.mode
            }, function (results, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(results);
                    console.log(results);
                }
                else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        });
    };
    DirectionsPage.prototype.watchLoc = function () {
        var _this = this;
        this.loc.watchPosition({
            enableHighAccuracy: true
        }).subscribe(function (pos) {
            var latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            if (_this.selfMarker) {
                _this.selfMarker.setMap(null);
            }
            _this.selfMarker = new google.maps.Marker({
                map: _this.map,
                position: latLng,
                icon: "http://www.google.com/mapfiles/dd-start.png"
            });
            _this.markers.push(_this.selfMarker);
        });
    };
    return DirectionsPage;
}());
__decorate([
    ViewChild('map'),
    __metadata("design:type", ElementRef)
], DirectionsPage.prototype, "mapElement", void 0);
DirectionsPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-directions',
        templateUrl: 'directions.html',
    }),
    __metadata("design:paramtypes", [Geolocation, NavController, NavParams])
], DirectionsPage);
export { DirectionsPage };
//# sourceMappingURL=directions.js.map