import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CouponService, Coupon } from '../coupon/coupon.service';
import { Person } from '../datacomplete_consumer/services/person.service';

@Component({
  selector: 'app-couponsetting',
  templateUrl: './couponsetting.component.html',
  styleUrls: ['./couponsetting.component.scss']
})
export class CouponsettingComponent implements OnInit {

  person : Person = this.auth.person; 
  coupon : Coupon = new Coupon(null,null,null,null,null);
  constructor(public auth : AuthService, public couponService : CouponService) {
    this.couponService.getCoupon(this.person.i).subscribe(res => {
    this.coupon = res; 
    });
   }

  ngOnInit() {
    
  }

  saveCoupon(){
    this.coupon.selleri = this.auth.person.i;

    if((<HTMLInputElement>document.getElementById("coupon_value")).value){
      this.coupon.number = (<HTMLInputElement>document.getElementById("coupon_value")).value;
    }else{
      this.coupon.number = "";
    }

    if((<HTMLInputElement>document.getElementById("coupon_text")).value){
      this.coupon.coupontext = (<HTMLInputElement>document.getElementById("coupon_text")).value;
    }else{
      this.coupon.coupontext = "";
    }

    if((<HTMLInputElement>document.getElementById("coupon_detail")).value){
      this.coupon.coupondetail = (<HTMLInputElement>document.getElementById("coupon_detail")).value;
    }else{
      this.coupon.coupondetail = "";
    }

    if((<HTMLInputElement>document.getElementById("coupon_moneyvalue")).value){
      this.coupon.moneyvalue = (<HTMLInputElement>document.getElementById("coupon_moneyvalue")).value;
    }else{
      this.coupon.moneyvalue = "";
    }

    this.couponService.sendSystem(this.coupon).subscribe();
  }

}
