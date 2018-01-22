import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PointService, Points } from '../points/points.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ngx-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {

  points : Points = new Points(null,null,null);
  modalHeader: string;
  modalContent = `Der LoloCODE wurde erfolgreich gescannt. Bitte geben Sie nun den Kaufbetrag ein, um deinem Kunden LoloCOINs gutzuschreiben: `;
  umsatz = '';
  consumerid; 
  sellerid; 

  isCoordSource = new BehaviorSubject<any>(null);
  _currentCoord : Observable<any> = this.isCoordSource.asObservable().first(); 

  constructor(private activeModal: NgbActiveModal, public pointservice : PointService) { 



  }

  angekommen(punkte : any){
    this.isCoordSource.next(punkte);
  }

  closeModal() {

    this.points.points = (<HTMLInputElement>document.getElementById("umsatz")).value;
    this.points.useri = this.consumerid; 
    this.points.selleri = this.sellerid; 
    if(this.consumerid.indexOf("auth") >= 0){
      if(this.points.points){
      this.pointservice.sendPoints(this.points).subscribe(()=>{alert("Punkte versandt")
      this.activeModal.close()});
    }
    } else {
      this.pointservice.cashCoupon(this.consumerid).subscribe(result =>{
        console.log("hat geklappt " + result);
        alert("gutgeschrieben");
        this.activeModal.close();
       
      });
    }
    
    
  }
}
