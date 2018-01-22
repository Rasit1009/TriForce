import { Component } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './modal/modal.component';
import { promise } from 'selenium-webdriver';
import { AuthService } from '../../auth/auth.service';
import { Person } from '../datacomplete_consumer/services/person.service';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';



@Component({
  selector: 'ngx-sellermap',
  styleUrls: ['./sellermap.component.scss'],
  templateUrl: './sellermap.component.html',
})
export class SellermapComponent implements OnInit{

  allSeller : Person[] = []; 
  lat; 
  lng; 
  isCoordSource = new BehaviorSubject<any>(null);
  _currentCoord : Observable<any> = this.isCoordSource.asObservable().first(); 

  addresses : marker[] = [
    {
		  lat: 50.997292,
		  lng: 6.905840,
		  label: 'A',
      draggable: false
	  },
  ]; 


  constructor(private modalService: NgbModal, public auth : AuthService, public http : Http) {
  //  console.log("Yolo");
      
        this.allSeller = (this.auth.getAllSeller()); 
       // console.log(this.allSeller);
        var address : string[] = []; 
        var result; 
        //console.log(this.allSeller.length);
            var zaehler = 0;  
            console.log(this.allSeller);  
            for(var i = 0; i<this.allSeller.length; i++){
            address[i] = this.allSeller[i].street + (" ") + this.allSeller[i].housenumber + (" ") + this.allSeller[i].city;  
          }

          zaehler = 0; 
            this.getLocation(address[0]).then(msg => {
              console.log(msg);    
        });
        

               /* this.lat = msg.results[0].geometry.location.lat;
                this.lng = msg.results[0].geometry.location.lng;
                this.addresses[0].lat = this.lat; 
                this.addresses[0].lng = this.lng; 
                this.addresses[0].label = this.allSeller[zaehler].businessname[0];
                this.sellerName = this.allSeller[zaehler].businessname;  
                this.markers.push(this.addresses[0]);
                zaehler++; */
   }

   setNewCoord(lat : any){
     console.log("coord geändert");
    this.isCoordSource.next(lat);
   }

   getLocation(term: string):Promise<any> {
    return this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + term + 'CA&sensor=false')
         .toPromise()
         .then((response) => Promise.resolve(response.json()))
         .catch((error) => Promise.resolve(error.json()));
 }

  showLargeModal() {
    const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
    console.log('constructortest');
    activeModal.componentInstance.modalHeader = 'Museum Ludwig';
    
  }

sellerName = 'Museum Ludwig';

geolocationPosition: Position;
positionlat: number = 50.916733;
positionlng: number = 6.941262;


setData(){
  if (window.navigator && window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(
        position => {
            this.geolocationPosition = position,
                //console.log(position)
                this.positionlat = position.coords.latitude;                      
                this.positionlng = position.coords.longitude;
                console.log(this.positionlat);
                console.log(this.positionlng);
  
        },
        error => {
            switch (error.code) {
                case 1:
                    console.log('Standort nicht zugelassen');
                    break;
                case 2:
                    console.log('Standort nicht gefunden');
                    break;
                case 3:
                    console.log('Timeout');
                    break;
            }
        }
    );
  }; 
}

  ngOnInit() {
    console.log("Yala");
    this.setLocation().then(() => this.setAll()); 
    }

    setLocation(){    
      var promise = new Promise((resolve, reject) => {
                 this.setData();
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      return promise;
    }

    setAll(){
      this.mylocationconverterx();
      this.mylocationconvertery();
    }

    mylocationconverterx(){
      var x = this.positionlat;
      console.log('LängengradconverterX: ' + x);
   return x;
    }

    mylocationconvertery(){
      var y = this.positionlng
      console.log('LängengradconverterY: ' + y);
   return y;
    }

  // google maps zoom level
  zoom: number = 12;
  
  // initial center position for the map
  //lat: number = 50.941278;
  //lng: number = 6.958281;

//  lat: number = this.positionlat;
 // lng: number = this.positionlng;
  

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
 /** mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  } */
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
  ]
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
  draggable: boolean;
}


