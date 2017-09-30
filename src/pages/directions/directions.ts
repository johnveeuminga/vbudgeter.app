import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the DirectionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google; 

@IonicPage()
@Component({
  selector: 'page-directions',
  templateUrl: 'directions.html',
})


export class DirectionsPage {
  @ViewChild('map') mapElement: ElementRef;


	store: any;
	dest: any;
	mode:any;
	map:any;
  selfMarker;
  selfLocWindow;
  markers = [];

  constructor(private loc: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
  	let mode = this.navParams.get('mode')
  	if(mode==1){
  	  this.mode = "WALKING"
  	}else{
  	  this.mode = "DRIVING"
  	}
  	this.store = this.navParams.get('store');
  	console.log(this.store)
    this.dest = this.navParams.get('destination')

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectionsPage');
    this.loadMap();
    this.watchLoc();
  }

  private loadMap(){
  	this.loc.getCurrentPosition({
  	  enableHighAccuracy: true
  	}).then((pos)  =>  {
      let latLng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(this.map);
      directionsService.route({
        origin: latLng,
        destination: this.dest,
        travelMode: this.mode
      }, (results, status ) => {
        if (status === 'OK') {
          directionsDisplay.setDirections(results);
          console.log(results);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      })
  	});
  }

  private watchLoc(){
    this.loc.watchPosition({
      enableHighAccuracy: true
    }).subscribe( pos => {
      let latLng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
      if(this.selfMarker){
        this.selfMarker.setMap(null)
      }
      this.selfMarker = new google.maps.Marker({
        map: this.map,
        position: latLng,
        icon: "http://www.google.com/mapfiles/dd-start.png"
      })
      this.markers.push(this.selfMarker);      
    })
  }

}
