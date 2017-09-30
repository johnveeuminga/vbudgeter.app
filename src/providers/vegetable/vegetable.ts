import { Injectable } from '@angular/core';
import { RequestProvider } from '../request/request';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the VegetableProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class VegetableProvider {

	url:any

  constructor(private req: RequestProvider, public http: Http) {
  	this.url = this.req.apiUrl + 'api/vegetables';
  }

  store(data){
  	return this.req.performPost(this.url, data);
  }

  edit(data, id){
  	return this.req.performPut(this.url+'/'+id, data);
  }

  delete(id){
    return this.req.performDelete(this.url+'/'+id);
  }

}
