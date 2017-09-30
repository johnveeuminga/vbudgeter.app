var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/*
  Generated class for the RequestProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var RequestProvider = (function () {
    function RequestProvider(http) {
        this.http = http;
        this.apiUrl = "http://192.168.56.1:8000/";
        this.dataHeader = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });
        console.log('Hello RequestProvider Provider');
    }
    RequestProvider.prototype.performPost = function (url, postData) {
        return this.http.post(url, JSON.stringify(postData), {
            headers: this.dataHeader
        })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable.throw(error.json() || 'Error'); });
    };
    RequestProvider.prototype.performGet = function (url) {
        return this.http.get(url, {
            headers: this.dataHeader
        })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable.throw(error.json() || 'Error'); });
    };
    RequestProvider.prototype.performPut = function (url, putData) {
        return this.http.put(url, JSON.stringify(putData), {
            headers: this.dataHeader
        })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable.throw(error.json() || 'Error'); });
    };
    RequestProvider.prototype.performDelete = function (url) {
        return this.http.delete(url, {
            headers: this.dataHeader
        })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable.throw(error.json().error || 'Error'); });
    };
    return RequestProvider;
}());
RequestProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], RequestProvider);
export { RequestProvider };
//# sourceMappingURL=request.js.map