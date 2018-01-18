import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CouponService, Coupon } from '../coupon/coupon.service';
import { Person } from '../datacomplete_consumer/services/person.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'app-couponsetting',
  templateUrl: './couponsetting.component.html',
  styleUrls: ['./couponsetting.component.scss']
})
export class CouponsettingComponent implements OnInit {

  person : Person = this.auth.person; 
  coupon : Coupon = new Coupon(null,null,null,null,null);

  
  constructor(public auth : AuthService, public couponService : CouponService, private toasterService: ToasterService) {
    this.couponService.getCoupon(this.person.i).subscribe(res => {
    this.coupon = res; 
   // if(!this.coupon.moneyvalue )
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



  //---------------------------------------------TOAST START----------------------------------------------------
datenaktualisieren: boolean = true;


initToasts(){
  //function call delay for fade-in effect mhendric 18.01.18

  if(this.datenaktualisieren){
    setTimeout(() => { this.showToast('sucess', 'Aktualisieren', 'Hier können Sie für eine bessere Kundenbindung Ihre Daten aktualisieren.');}, 1000);
  } 
  
    }

config: ToasterConfig;

position = 'toast-top-right';
animationType = 'flyleft';
title = 'HI there!';
content = `I'm cool toaster!`;
timeout = 0;
toastsLimit = 5;
type = 'success';

isNewestOnTop = false;
isHideOnClick = true;
isDuplicatesPrevented = false;
isCloseButton = true;

types: string[] = ['info', 'success', 'warning', 'error'];
animations: string[] = ['fade', 'flyLeft', 'flyRight', 'slideDown', 'slideUp'];
positions: string[] = ['toast-top-full-width', 'toast-bottom-full-width', 'toast-top-left', 'toast-top-center',
  'toast-top-right', 'toast-bottom-right', 'toast-bottom-center', 'toast-bottom-left', 'toast-center'];


makeToast() {
  this.showToast(this.type, this.title, this.content);
}


public showToast(type: string, title: string, body: string) {
  this.config = new ToasterConfig({
    positionClass: this.position,
    timeout: this.timeout,
    newestOnTop: this.isNewestOnTop,
    tapToDismiss: this.isHideOnClick,
    preventDuplicates: this.isDuplicatesPrevented,
    animation: this.animationType,
    limit: this.toastsLimit,
  });
  const toast: Toast = {
    type: type,
    title: title,
    body: body,
    timeout: this.timeout,
    showCloseButton: this.isCloseButton,
    bodyOutputType: BodyOutputType.TrustedHtml,
  };
  this.toasterService.popAsync(toast);
}

clearToasts() {
  this.toasterService.clear();
}

//---------------------------------------------TOAST END----------------------------------------------------

}
