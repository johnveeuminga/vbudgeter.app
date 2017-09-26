import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { DatabaseProvider } from '../database/database'
import { RequestProvider } from '../request/request'
import {Observable} from 'rxjs/Rx';
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
    access_token: any;
    constructor(email: string, id: number, name: string, username: string, address: string, contact: string, usertype:number, access_token:any){
      this.id= id;
      this.name = name;
      this.username = username;
      this.email = email;
      this.address = address;
      this.contact = contact;
      this.usertype = usertype;
      this.access_token = access_token
      
    }
  }
@Injectable()
export class AuthProvider {

  currentUser: User; 
  appUrl: any;

  constructor(private req: RequestProvider, private database: DatabaseProvider, public http: Http) {
    this.appUrl = this.req.apiUrl + 'oauth/token';
  }

  public login(credentials){
		let postData = {
      grant_type: "password",
      client_id: 1,
      client_secret: 'vbudgeter',
      username: credentials.username,
      password: credentials.password,
      scope: ""
    }	

    return this.req.performPost(this.appUrl, postData);
  }
  
  public getUser(token){
		let url = this.req.apiUrl + 'api/user';

    let headers = new Headers({
      "Accept": 'application/json',
       'Authorization':'Bearer '+token,
    })

    return this.http.get(url, {
      headers: headers
    }).map(res => res.json())
    .catch((error:any) =>  Observable.throw(error.json() || 'Error'))

  }
  
  public store(data){
  	return this.database.addUser(data.email, data.name, data.username, data.password, data.address, data.contact, data.usertype).then( data => {
      return data
    }).catch( error => {
      return Promise.reject(error);
    })

  }

	public setUser(email: string, id:number, name: string, username: string, address: string, contact: string, usertype:number, token:any){
		this.currentUser = new User(email, id, name, username, address, contact, usertype,token);
	}

	public logout(){
		this.currentUser = null;
	}

  public getUserInfo(){
    return this.currentUser;
  }

}
