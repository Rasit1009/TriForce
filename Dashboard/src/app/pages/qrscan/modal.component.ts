import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PointService, Points } from '../points/points.service';

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

  constructor(private activeModal: NgbActiveModal, public pointservice : PointService) { }

  closeModal() {
    if(this.consumerid.indexOf("auth") >= 0){
      this.points.points = (<HTMLInputElement>document.getElementById("umsatz")).value;
      this.points.useri = this.consumerid; 
      this.points.selleri = this.sellerid; 
      this.pointservice.sendPoints(this.points).subscribe(()=>alert("Punkte versandt"));
    } else {
      this.pointservice.cashCoupon(this.consumerid).subscribe(()=>alert("gutgeschrieben"));
    }
    
    this.activeModal.close();
  }
}
