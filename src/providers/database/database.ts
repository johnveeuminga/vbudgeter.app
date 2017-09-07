import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { IonicStorageModule, Storage } from  '@ionic/storage';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  database:SQLiteObject
  private databaseReady: BehaviorSubject<boolean>;
  
  constructor(private storage:Storage, private platform: Platform, private sqlitePort: SQLitePorter, private sqlite: SQLite, public http: Http) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then( () => {
      this.sqlite.create({
        name: 'vbudgeter.db',
        location: 'default'
      }).then( (db:SQLiteObject) => {
        this.database = db;
        this.storage.get('database_filled').then( val => {
          if(val){
            this.databaseReady.next(true);
            console.log('ready')            
          }else{
            this.fillDatabase();
          }
        })
      })
    }); 

  }

  fillDatabase(){
  	this.http.get('assets/database.sql')
  	.map(res=> res.text())
  	.subscribe(sql => {
  		this.sqlitePort.importSqlToDb(this.database, sql)
  		.then(data => {
        console.log('filled')                    
  			this.databaseReady.next(true);
  			this.storage.set('database_filled', true);
  		})
  	});
  }

  searchUser(id){
  	let data = [id];
  	return this.database.executeSql("SELECT * FROM users WHERE id = (?)", data)
  		.then (res => {
  			return {
  				data: res.rows.item(0)
  			}
  		})
  }

  checkIfUsernameExist(username){
  	let data = [username]
  	console.log(username);
  	return this.database.executeSql("SELECT * FROM users WHERE username = (?)", [username])
  		.then (res => {
  			return res.rows;
  		})
  }

  addUser(email, name, username, password, address, contact_number, usertype){
  	let data = [email, name, username ,password, address, contact_number, usertype];
  	return new Promise((resolve, reject)  => {
  		this.checkIfUsernameExist(username).then( res => {
  			if(res.length > 0){
  				return reject("Username Already Taken");
  			}else{
  				resolve(this.database.executeSql("INSERT INTO users (email, name, username, password, address, contact_number, usertype) VALUES (?, ?, ?, ?, ?, ?, ?)", data)
  					.then( res => {
  						return res
  					}))
  			}
  		})
    })
  }


}
