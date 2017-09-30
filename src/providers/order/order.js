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
import { Http } from '@angular/http';
import { RequestProvider } from '../request/request';
import { AuthProvider } from '../auth/auth';
import 'rxjs/add/operator/map';
/*
  Generated class for the OrderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var OrderProvider = (function () {
    function OrderProvider(auth, req, http) {
        this.auth = auth;
        this.req = req;
        this.http = http;
        this.url = this.req.apiUrl + 'api/orders';
    }
    OrderProvider.prototype.store = function (data) {
        return this.req.performPost(this.url, data);
    };
    OrderProvider.prototype.delete = function (data) {
        var url = this.url + '/' + data;
        return this.req.performDelete(url);
    };
    OrderProvider.prototype.getUserWithStore = function () {
        var id = this.auth.getUserInfo()['id'];
        var url = this.req.apiUrl + 'api/users/' + id;
        return this.req.performGet(url);
    };
    OrderProvider.prototype.getOrders = function () {
        var _this = this;
        return this.getUserWithStore().map(function (res) {
            var url = _this.req.apiUrl + 'api/stores/' + res.data.store.id + '/orders';
            console.log(url);
            return _this.req.performGet(url);
        });
    };
    return OrderProvider;
}());
OrderProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AuthProvider, RequestProvider, Http])
], OrderProvider);
export { OrderProvider };
//# sourceMappingURL=order.js.map