import { Component } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './modal/modal.component';



@Component({
  selector: 'ngx-sellermap',
  styleUrls: ['./sellermap.component.scss'],
  templateUrl: './sellermap.component.html',
})
export class SellermapComponent implements OnInit{


  constructor(private modalService: NgbModal) { }

  showLargeModal() {
    const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
    console.log('constructortest');
    activeModal.componentInstance.modalHeader = 'Museum Ludwig';
    
  }

sellerName = 'Museum Ludwig';

geolocationPosition: Position;
positionlat: number = 50.916733;
positionlng: number = 6.941262;



  ngOnInit() {
    
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

  lat: number = this.positionlat;
  lng: number = this.positionlng;
  



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
      lat: this.mylocationconverterx(),
      lng: this.mylocationconvertery(),
		  label: '',
      draggable: false
	  },
	  {
		  lat: 50.997292,
		  lng: 6.905840,
		  label: 'A',
      draggable: false
	  },
	  {
		  lat: 50.947392,
		  lng: 6.915850,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 50.967399,
		  lng: 6.904750,
		  label: 'C',
		  draggable: true
    }
  ]
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
  draggable: boolean;
}


