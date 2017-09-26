import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestProvider } from '../request/request'
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {

	url: any;

  constructor(private req: RequestProvider, public http: Http) {
  	this.url = this.req.apiUrl + 'api/users'
    
  }

  store(postData){
  	return this.req.performPost(this.url, postData)
  }

}
