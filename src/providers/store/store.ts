import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestProvider } from '../request/request';
import 'rxjs/add/operator/map';

/*
  Generated class for the StoreProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class StoreProvider {

	url: any;
  constructor(private req: RequestProvider, public http: Http) {
  	this.url = this.req.apiUrl + 'api/stores'
  }

  edit(data, id){
  	return this.req.performPut(this.url+'/'+id, data);
  }

  delete(id){
    return this.req.performDelete(this.url+'/'+id);
  }

  getAllStores(){
  	return this.req.performGet(this.url);
  }

  getSellerStore(id){
  	return this.req.performGet(this.req.apiUrl + 'api/users/'+id+'/getStore')
  }

  setLocation(id, data){
    return this.req.performPut(this.url+'/'+id+'/setLocation', data);
  }

}
