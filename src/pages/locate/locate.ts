import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'

import { DirectionsPage } from '../directions/directions';

/**
 * Generated class for the LocatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-locate',
  templateUrl: 'locate.html',
})
export class LocatePage {
	@ViewChild('map') mapElement: ElementRef;
  map: any;
  latLng: any;
  store: any;

  constructor(private actionSheet: ActionSheetController, private loc: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
    this.store = this.navParams.get("store");
    this.latLng = new google.maps.LatLng(this.store.latitude, this.store.longitude);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocatePage');

    this.loadMap();
  }

  loadMap(){
  	this.loc.getCurrentPosition( {enableHighAccuracy: true})
  		.then( pos => {
  			let currentPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude)
  			let mapOptions = {
  			  center: this.latLng,
  			  zoom: 18,
  			  mapTypeId: google.maps.MapTypeId.ROADMAP
  			}

  			this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions); 

  			let selfMarker = new google.maps.Marker({
  			  map: this.map,
  			  position: currentPos,
  			  icon: "http://www.google.com/mapfiles/dd-start.png"
  			})

  			let storeMarker = new google.maps.Marker({
  				map: this.map,
  				position: this.latLng
  			})


  		})
  }

  presentActionSheet(){
    let actionSheet = this.actionSheet.create({
      title: 'Select mode of transportation',
      buttons: [
        {
          text: "Walking",
          icon: "walk",
          handler: () => {
            this.goToDirectionsPage(1)
          }
        },

        {
          text: "Driving",
          icon: "car",
          handler: () => {
            this.goToDirectionsPage(2)            
          }
        },
        
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
        }
      ]
    });

    actionSheet.present();
  }

  goToDirectionsPage(mode, store={store_name: "Store 1"}){
    let destination = this.latLng
    this.navCtrl.push(DirectionsPage, {mode, destination})
  }

}
