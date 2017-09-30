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
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { SQLite } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Storage } from '@ionic/storage';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var DatabaseProvider = (function () {
    function DatabaseProvider(storage, platform, sqlitePort, sqlite, http) {
        var _this = this;
        this.storage = storage;
        this.platform = platform;
        this.sqlitePort = sqlitePort;
        this.sqlite = sqlite;
        this.http = http;
        this.databaseReady = new BehaviorSubject(false);
        this.platform.ready().then(function () {
            _this.sqlite.create({
                name: 'vbudgeter.db',
                location: 'default'
            }).then(function (db) {
                _this.database = db;
                _this.storage.get('database_filled').then(function (val) {
                    if (val) {
                        _this.databaseReady.next(true);
                        console.log('ready');
                    }
                    else {
                        console.log('fill');
                        _this.fillDatabase();
                    }
                });
            });
        });
    }
    DatabaseProvider.prototype.fillDatabase = function () {
        var _this = this;
        this.http.get('assets/database.sql')
            .map(function (res) { return res.text(); })
            .subscribe(function (sql) {
            _this.sqlitePort.importSqlToDb(_this.database, sql)
                .then(function (data) {
                console.log('filled');
                _this.databaseReady.next(true);
                _this.storage.set('database_filled', true);
            });
        });
    };
    DatabaseProvider.prototype.searchUser = function (id) {
        var data = [id];
        return this.database.executeSql("SELECT * FROM users WHERE id = (?)", data)
            .then(function (res) {
            return {
                data: res.rows.item(0)
            };
        });
    };
    DatabaseProvider.prototype.checkIfUsernameExist = function (username) {
        var data = [username];
        console.log(username);
        return this.database.executeSql("SELECT * FROM users WHERE username = (?)", [username])
            .then(function (res) {
            return res.rows;
        });
    };
    DatabaseProvider.prototype.addUser = function (email, name, username, password, address, contact_number, usertype) {
        var _this = this;
        var data = [email, name, username, password, address, contact_number, usertype];
        return new Promise(function (resolve, reject) {
            _this.checkIfUsernameExist(username).then(function (res) {
                if (res.length > 0) {
                    return reject("Username Already Taken");
                }
                else {
                    resolve(_this.database.executeSql("INSERT INTO users (email, name, username, password, address, contact_number, usertype) VALUES (?, ?, ?, ?, ?, ?, ?)", data)
                        .then(function (res) {
                        return res;
                    }));
                }
            });
        });
    };
    return DatabaseProvider;
}());
DatabaseProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Storage, Platform, SQLitePorter, SQLite, Http])
], DatabaseProvider);
export { DatabaseProvider };
//# sourceMappingURL=database.js.map