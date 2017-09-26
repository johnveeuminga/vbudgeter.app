import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestProvider } from '../request/request';
import { AuthProvider } from '../auth/auth'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class OrderProvider {

	url:any;
	id: any;

  constructor(public auth: AuthProvider, public req: RequestProvider, public http: Http) {
    this.url = this.req.apiUrl + 'api/orders'
  }

store(data){
  return this.req.performPost(this.url, data);
}

delete(data){
	let url = this.url + '/' + data;
	return this.req.performDelete(url)
}

getUserWithStore():Observable<any>{
	let id = this.auth.getUserInfo()['id'];
	let url = this.req.apiUrl + 'api/users/' + id

	return this.req.performGet(url)

}

getOrders(): Observable<any>{
	return this.getUserWithStore().map( res => {
		console.log(res);
    	let url = this.req.apiUrl + 'api/stores/'+res.data.store.id+'/orders'

    	console.log(url);

		  return this.req.performGet(url);
	})
}


}
