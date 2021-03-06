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
import { RequestProvider } from '../request/request';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the VegetableProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var VegetableProvider = (function () {
    function VegetableProvider(req, http) {
        this.req = req;
        this.http = http;
        this.url = this.req.apiUrl + 'api/vegetables';
    }
    VegetableProvider.prototype.store = function (data) {
        return this.req.performPost(this.url, data);
    };
    VegetableProvider.prototype.edit = function (data, id) {
        return this.req.performPut(this.url + '/' + id, data);
    };
    VegetableProvider.prototype.delete = function (id) {
        return this.req.performDelete(this.url + '/' + id);
    };
    return VegetableProvider;
}());
VegetableProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RequestProvider, Http])
], VegetableProvider);
export { VegetableProvider };
//# sourceMappingURL=vegetable.js.map