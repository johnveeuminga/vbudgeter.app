import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DatabaseProvider } from '../database/database'
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

  export class User {
    email: string;
    address: string;
    contact: string;
    id: number;
    name: string;
    username: string;
    usertype: number;
    constructor(email: string, id: number, name: string, username: string, address: string, contact: string, usertype:number){
      this.id= id;
      this.name = name;
      this.username = username;
      this.email = email;
      this.address = address;
      this.contact = contact;
      this.usertype = usertype;
      
    }
  }
@Injectable()
export class AuthProvider {

  currentUser: User;  

  constructor(private database: DatabaseProvider, public http: Http) {
  }

  public login(credentials){
		return new Promise((resolve, reject) => {
			if(credentials.username === null || credentials.password === null){
				return reject("Please insert credentials.")
			} else {
				this.database.checkIfUsernameExist(credentials.username).then( res => {
					if(res.length > 0){
						if(res.item(0).password === credentials.password){
							this.setUser(res.item(0).email, res.item(0).id, res.item(0).name, res.item(0).username, res.item(0).address, res.item(0).contact, res.item(0).usertype);
							return resolve(this.currentUser);
						}else{
							return reject("Incorrrect password");
						}
					}else{
						return reject("User does not exist.");
					}
				})
			}
		})	
  }
  
  public getUserInfo(): User{
		return this.currentUser;
  }
  
  public store(data){
  	return this.database.addUser(data.email, data.name, data.username, data.password, data.address, data.contact, data.usertype).then( data => {
      return data
    }).catch( error => {
      return Promise.reject(error);
    })

  }

	public setUser(email: string, id:number, name: string, username: string, address: string, contact: string, usertype:number){
		this.currentUser = new User(email, id, name, username, address, contact, usertype);
	}

	public logout(){
		this.currentUser = null;
	}

}
