import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;
@IonicPage()
@Component({
  selector: 'page-map-modale',
  templateUrl: 'map-modale.html',
})
export class MapModalePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  MapLocation;
  MapLatMapLng;
  CurrentPositionMap;
  flag = 0;
  latLng;
  geocoder = new google.maps.Geocoder();
  marker = new google.maps.Marker({
    map: this.map,
    draggable: true,
  });
  RetreivePosition;
  RetreiveData = { RetreiveAddress: '', RetreiveLat: '', RetreiveLong: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapModalePage');
    this.flag = 0;
    this.loadMap();
    let input_from = (<HTMLInputElement>document.getElementById("journey_from"));
    let options = {
      types: [],
    };
    // create the two autocompletes on the from and to fields
    let autocomplete1 = new google.maps.places.Autocomplete(input_from, options);
    // we need to save a reference to this as we lose it in the callbacks
    let self = this;
    // add the first listener
    google.maps.event.addListener(autocomplete1, 'place_changed', function () {
      let place = autocomplete1.getPlace();
      let geometry = place.geometry;
      if (geometry !== undefined) {
        console.log(place.name);
        console.log(geometry.location.lng());
        console.log(geometry.location.lat());
        self.MapLocation = new google.maps.LatLng(geometry.location.lat(), geometry.location.lng());
        console.log(self.MapLocation);
        self.addMarker(self.MapLocation);
      }
    });
  }

  public closeModal() {
    this.viewCtrl.dismiss();
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {
      this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: this.latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker(this.latLng);
    }, (err) => {
      console.log(err);
    });
  }

  addMarker(MarkerPosition) {
    this.marker.setMap(this.map);
    this.map.setCenter(MarkerPosition);
    this.marker.setPosition(MarkerPosition);
    this.marker.addListener('dragend', event => {
      MarkerPosition = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
      this.geocoder.geocode({ 'location': MarkerPosition }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          //document.getElementById('journey_from').setAttribute("value",results[0].formatted_address);
          this.CurrentPositionMap = results[0].formatted_address;
          console.log(results[0].formatted_address);
          this.RetreiveData.RetreiveAddress = results[0].formatted_address;
          this.flag++;
        }
      });
    });
    if (this.flag == 0) {
      this.geocoder.geocode({ 'location': MarkerPosition }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log(results[0].formatted_address);
          this.CurrentPositionMap = results[0].formatted_address;
          this.RetreiveData.RetreiveAddress = results[0].formatted_address;
        }
      });
    }

  }

  LoadMyLocation() {
    this.ionViewDidLoad();
  }
  save() {
    this.RetreivePosition = this.marker.getPosition();
    this.RetreiveData.RetreiveLat = this.RetreivePosition.lat();
    this.RetreiveData.RetreiveLong = this.RetreivePosition.lng();
    this.viewCtrl.dismiss(this.RetreiveData);
  }

}
