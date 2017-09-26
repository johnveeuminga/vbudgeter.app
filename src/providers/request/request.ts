import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/*
  Generated class for the RequestProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RequestProvider {

	public apiUrl = "http://192.168.56.1:8000/";
	public dataHeader = new Headers({
		"Content-Type":"application/json",
		"Accept":"application/json"
	})

  constructor(public http: Http) {
    console.log('Hello RequestProvider Provider');
  }

  public performPost(url, postData){
  	return this.http.post(url, JSON.stringify(postData), {
  		headers: this.dataHeader
  	})
  	.map((res:Response) => res.json())
  	.catch((error:any) =>  Observable.throw(error.json() || 'Error'))
  }

  public performGet(url){
  	return this.http.get(url, {
  		headers: this.dataHeader
  	})
  	.map((res:Response) => res.json())
  	.catch((error:any) =>  Observable.throw(error.json() || 'Error'))
  }

  public performPut(url, putData){
  	return this.http.put(url, JSON.stringify(putData), {
  		headers: this.dataHeader
  	})
  	.map((res:Response) => res.json())
  	.catch((error:any) =>  Observable.throw(error.json() || 'Error'))
  }

  public performDelete(url){
  	return this.http.delete(url, {
  		headers: this.dataHeader
  	})
  	.map((res:Response) => res.json())
  	.catch((error:any) =>  Observable.throw(error.json().error || 'Error'))
  }

}
