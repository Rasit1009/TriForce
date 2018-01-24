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
  isCoordSource = new BehaviorSubject<any>(null);
  _currentCoord : Observable<any> = this.isCoordSource.asObservable().first(); 



  constructor(private modalService: NgbModal, public auth : AuthService, public http : Http) {
  //  console.log("Yolo");
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

  showLargeModal(m : marker) {
    const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
    console.log('constructortest');
    activeModal.componentInstance.sellerHeader = m.header;
    activeModal.componentInstance.sellerText = m.sellertext;
    activeModal.componentInstance.sellerLogo = m.sellerlogo;
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
  
   //initial center position for the map
    lat: number = 50.941278;
    lng: number = 6.958281;

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
    {
      
      header: "TEST",
      sellertext: "TEST",
      sellerlogo: "TEST",
      lat: 50.941911,
      lng:  6.956812,
      label: 'G',
      draggable: false,
    },
    {
      header: "",
      sellertext: "",
      sellerlogo: "",
      lat: 50.948946,
      lng: 6.923270,
      label: 'U',
      draggable: false,
    },
    {
      header: "",
      sellertext: "",
      sellerlogo: "",
      lat: 50.947834,
      lng: 6.920917,
      label: 'L',
      draggable: false,
    },
    {
      header: "",
      sellertext: "",
      sellerlogo: "",
      lat: 50.918200,
      lng: 6.960677,
      label: 'D',
      draggable: false,
    },
    {
      header: "",
      sellertext: "",
      sellerlogo: "",
      lat: 50.918837,
      lng: 6.960443,
      label: 'E',
      draggable: false,
    },
    {
      header: "",
      sellertext: "",
      sellerlogo: "",
      lat: 50.917036,
      lng: 6.925157,
      label: 'K',
      draggable: false,
    },
    {
      header: "",
      sellertext: "",
      sellerlogo: "",
      lat: 50.996911,
      lng: 6.906057,
      label: 'S',
      draggable: false,
    },
    {
      header: "",
      sellertext: "",
      sellerlogo: "",
      lat: 50.935306,
      lng: 6.938741,
      label: 'A',
      draggable: false,
    },
    {
      header: "",
      sellertext: "",
      sellerlogo: "",
      lat: 50.946370,
      lng: 6.925387,
      label: 'Z',
      draggable: false,
    },
    {
      header: "",
      sellertext: "",
      sellerlogo: "",
      lat: 50.929549,
      lng: 6.938353,
      label: 'O',
      draggable: false,
    },
    {
      header: "",
      sellertext: "",
      sellerlogo: "",
      lat: 50.949203,
      lng: 6.926824,
      label: 'B',
      draggable: false,
    },
    {
      header: "",
      sellertext: "",
      sellerlogo: "",
      lat: 50.938649,
      lng: 6.973711,
      label: 'R',
      draggable: false,
    },
    {
      header: "",
      sellertext: "",
      sellerlogo: "",
      lat: 50.937277,
      lng: 6.947252,
      label: 'H',
      draggable: false,
    },
    {
      header: "",
      sellertext: "",
      sellerlogo: "",
      lat: 50.947378,
      lng: 6.946133,
      label: 'M',
      draggable: false,
    },
    {
      header: "",
      sellertext: "",
      sellerlogo: "",
      lat: 50.916644,
      lng: 6.928902,
      label: 'C',
      draggable: false,
    },
    {
      header: "",
      sellertext: "",
      sellerlogo: "",
      lat: 50.912277,
      lng: 6.960442,
      label: 'P',
      draggable: false,
    },
        
  ]
}

// just an interface for type safety.
interface marker {
  header? : string; 
  sellertext? : string; 
  sellerlogo? : string; 
	lat: number;
	lng: number;
	label?: string;
  draggable: boolean;
}


