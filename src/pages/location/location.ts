import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'
import { StoreProvider } from '../../providers/store/store';

import { SellerDashboardPage } from '../seller-dashboard/seller-dashboard'
/**
 * Generated class for the LocationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
	@ViewChild('map') mapElement: ElementRef;
	store: any;
	map:any;
	newLatLng = {latitude: null, longitude:null};
	latLng: any;
	marker: any;

  constructor(private storeProv: StoreProvider, private loc: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
  	this.store = this.navParams.get('store');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');

    this.loadMap();
  }

  loadMap(){
  	if(this.store.latitude){
  		this.latLng = new google.maps.LatLng(this.store.latitude, this.store.longitude);

  		let mapOptions = {
  		  center: this.latLng,
  		  zoom: 18,
  		  mapTypeId: google.maps.MapTypeId.ROADMAP
  		}

  		this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions); 

  		this.map.addListener('click', res => {
  			this.moveMarker(res)
  		});

  		this.marker = new google.maps.Marker({
  			map: this.map,
  			position: this.latLng
  		})
  	}else{
  		this.loc.getCurrentPosition( {enableHighAccuracy: true})
  			.then( pos => {
  				 this.latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
  				let mapOptions = {
  				  center: this.latLng,
  				  zoom: 18,
  				  mapTypeId: google.maps.MapTypeId.ROADMAP
  				}

  				this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions); 

  				this.map.addListener('click', res => {
  					this.moveMarker(res)
  				});

  			})
  	}
  }

  moveMarker(pos){
  	this.newLatLng.latitude = pos.latLng.lat();
  	this.newLatLng.longitude = pos.latLng.lng();


  	if(this.marker == undefined){
        this.marker = new google.maps.Marker({
          map: this.map,
          position: pos.latLng,
        })
  	}else{
  		this.marker.setPosition(pos.latLng)
  	}
  	this.map.setCenter(pos.latLng);

  	console.log(this.newLatLng)

  }

  editLocation(){
  	console.log(this.newLatLng);
  	this.storeProv.setLocation(this.store.id, this.newLatLng).subscribe( res => {
  		let store = res.store;
  		this.navCtrl.setRoot(SellerDashboardPage, {action:"edit", store})
  	})
  }


}
