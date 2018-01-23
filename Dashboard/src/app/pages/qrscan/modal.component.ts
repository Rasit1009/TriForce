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
    this.points.useri = this.collectCode; 
    console.log(this.sellerid);
    this.points.selleri = this.sellerid;
    console.log(this.points.points + " ist einfach leer"); 
    if(this.points.points){
      this.pointservice.sendPoints(this.points).subscribe(()=>{alert("Umsatzeingabe registriert.")
      this.activeModal.close()});
      }
    }


  bookCoupon(){
    this.pointservice.cashCoupon(this.couponCode).subscribe(result =>{
      console.log("Coupon Gutgeschrieben:" + result);
      alert("Der Gutschein wurde eingelöst.");
      this.activeModal.close();
  })
}

  justClose(){
    this.activeModal.close();
  }
}
