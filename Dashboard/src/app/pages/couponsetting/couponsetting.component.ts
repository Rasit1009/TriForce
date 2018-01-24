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

  
  
  constructor(public auth : AuthService, public couponService : CouponService, public toasterService: ToasterService) {

this.showToast('sucess', 'test', 'test');


    this.auth.isPersonSource.subscribe(res => {
      this.person = res;
      try {
        this.couponService.getCoupon(this.person.i).subscribe(res => {
          if(res){
            this.coupon = res;
            console.log(this.coupon); 
          }
        })
      } catch (error) {
        console.log("noch kein user da "); 
      }
    })
  }
   public ngOnInit(): void{
  }

  saveCoupon(){
       this.coupon.selleri = this.person.i;
        this.coupon.selleri = this.person.i;
        
     if((<HTMLInputElement>document.getElementById("value")).value){
      this.coupon.number = (<HTMLInputElement>document.getElementById("value")).value;
    } else {
      this.coupon.number = ""; 
    }

    if((<HTMLInputElement>document.getElementById("text")).value){
      this.coupon.coupontext = (<HTMLInputElement>document.getElementById("text")).value;
    }else{
      this.coupon.coupontext = "";
    }

    if((<HTMLInputElement>document.getElementById("detail")).value){
      this.coupon.coupondetail = (<HTMLInputElement>document.getElementById("detail")).value;
    }else{
      this.coupon.coupondetail = "";
    }

    if((<HTMLInputElement>document.getElementById("value")).value){
      this.coupon.moneyvalue = (<HTMLInputElement>document.getElementById("moneyvalue")).value;
    }else{
      this.coupon.moneyvalue = "";
    }
 /* } else if(this.coupon){
    alert("Coupon was drin");
    this.coupon.selleri = this.person.i;
    if((<HTMLInputElement>document.getElementById("coupon_value")).value){
      this.coupon.number = (<HTMLInputElement>document.getElementById("coupon_value")).value;
    }else {
      this.coupon.number = ""; 
    }

    if((<HTMLInputElement>document.getElementById("coupon_text")).value){
      this.coupon.coupontext = (<HTMLInputElement>document.getElementById("coupon_text")).value;
    }else
    
    {
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
  } */

    console.log(this.coupon);
    if((<HTMLInputElement>document.getElementById("value")).value&&(<HTMLInputElement>document.getElementById("text")).value&&
    (<HTMLInputElement>document.getElementById("detail")).value&&(<HTMLInputElement>document.getElementById("detail")).value&&
    (<HTMLInputElement>document.getElementById("value")).value){
      this.auth.s_complete = true; 
      this.couponService.sendSystem(this.coupon).subscribe(()=>alert("geht klar"),()=>alert("ungültige Eingabe"));
      this.auth.setNewUserData(this.auth.person);
    } else{
      this.auth.s_complete = false;  
      alert("Bitte alle Felder ausfüllen");
      this.auth.setNewUserData(this.auth.person);
    }
     }




    //---------------------------------------------TOAST START----------------------------------------------------
    datennochnichtvollstaendig: boolean = true;
    nochnichtirgendwoeingekauft: boolean = true;
    gutscheinverfuegbar: boolean = true;
    ersteanmeldung: boolean = true;
    
    
    
      initToasts(){
        //function call delay for fade-in effect mhendric 18.01.18
        if(this.ersteanmeldung){
          setTimeout(() => { this.showToast('sucess', 'Willkommen im Scanner', 'Hier kannst du LoloCOINs gutschreiben und LoloCOUPONs einlösen.');}, 1000);
        } 
        
          }
    
      config: ToasterConfig;
    
      position = 'toast-bottom-right';
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
