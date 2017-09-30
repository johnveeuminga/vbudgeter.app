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
import { DatabaseProvider } from '../database/database';
import { RequestProvider } from '../request/request';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var User = (function () {
    function User(email, id, name, username, address, contact, usertype, access_token, store) {
        if (store === void 0) { store = null; }
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.address = address;
        this.contact = contact;
        this.usertype = usertype;
        this.access_token = access_token;
        this.store = store;
    }
    return User;
}());
export { User };
var AuthProvider = (function () {
    function AuthProvider(req, database, http) {
        this.req = req;
        this.database = database;
        this.http = http;
        this.appUrl = this.req.apiUrl + 'oauth/token';
    }
    AuthProvider.prototype.login = function (credentials) {
        var postData = {
            grant_type: "password",
            client_id: 1,
            client_secret: 'vbudgeter',
            username: credentials.username,
            password: credentials.password,
            scope: ""
        };
        return this.req.performPost(this.appUrl, postData);
    };
    AuthProvider.prototype.getUser = function (token) {
        var url = this.req.apiUrl + 'api/user';
        var headers = new Headers({
            "Accept": 'application/json',
            'Authorization': 'Bearer ' + token,
        });
        return this.http.get(url, {
            headers: headers
        }).map(function (res) { return res.json(); })
            .catch(function (error) { return Observable.throw(error.json() || 'Error'); });
    };
    AuthProvider.prototype.store = function (data) {
        return this.database.addUser(data.email, data.name, data.username, data.password, data.address, data.contact, data.usertype).then(function (data) {
            return data;
        }).catch(function (error) {
            return Promise.reject(error);
        });
    };
    AuthProvider.prototype.setUser = function (email, id, name, username, address, contact, usertype, token, store) {
        var _this = this;
        this.currentUser = new User(email, id, name, username, address, contact, usertype, token, store);
        if (this.currentUser.usertype == 1) {
            this.req.performGet(this.req.apiUrl + '/users/' + id + '/getStore').subscribe(function (res) {
                _this.currentUser.store = res;
                console.log(_this.currentUser);
            });
        }
    };
    AuthProvider.prototype.logout = function () {
        this.currentUser = null;
    };
    AuthProvider.prototype.getUserInfo = function () {
        return this.currentUser;
    };
    return AuthProvider;
}());
AuthProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RequestProvider, DatabaseProvider, Http])
], AuthProvider);
export { AuthProvider };
//# sourceMappingURL=auth.js.map