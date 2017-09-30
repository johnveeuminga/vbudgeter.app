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
import 'rxjs/add/operator/map';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var UserProvider = (function () {
    function UserProvider(req, http) {
        this.req = req;
        this.http = http;
        this.url = this.req.apiUrl + 'api/users';
    }
    UserProvider.prototype.store = function (postData) {
        return this.req.performPost(this.url, postData);
    };
    return UserProvider;
}());
UserProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RequestProvider, Http])
], UserProvider);
export { UserProvider };
//# sourceMappingURL=user.js.map