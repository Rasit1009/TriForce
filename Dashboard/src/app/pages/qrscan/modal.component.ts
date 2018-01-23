import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PointService, Points } from '../points/points.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ngx-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {

  points : Points = new Points(null,null,null);
  
  umsatz = '';
  consumerid; 
  sellerid; 
  couponCode;
  collectCode; 
  couponText; 
  coupondetail;

  constructor(private activeModal: NgbActiveModal, public pointservice : PointService) { 
  }


  bookPoints(){
    this.points.points = (<HTMLInputElement>document.getElementById("umsatz")).value;
    this.points.useri = this.consumerid; 
    this.points.selleri = this.sellerid; 

    this.pointservice.sendPoints(this.points).subscribe(()=>{alert("Punkte versandt")
      this.activeModal.close()});
  }


  bookCoupon(){
    this.pointservice.cashCoupon(this.couponCode).subscribe(result =>{
      console.log("Coupon Gutgeschrieben:" + result);
      alert("gutgeschrieben");
      this.activeModal.close();
  })
}

  justClose(){
    this.activeModal.close();
  }
}
