import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PointService, Points } from '../points/points.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

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

  constructor(private activeModal: NgbActiveModal, public pointservice : PointService, public toasterService: ToasterService) { 
  }


  bookPoints(){
    this.points.points = (<HTMLInputElement>document.getElementById("umsatz")).value;
    this.points.useri = this.collectCode; 
    console.log(this.sellerid);
    this.points.selleri = this.sellerid;
    console.log(this.points.points + " ist einfach leer"); 
    if(this.points.points){
      this.pointservice.sendPoints(this.points).subscribe(()=>{
      this.activeModal.close()});
      this.showToast('success','Umsatz verbucht','Glückwunsch der Umsatz dewürde erfolgreich in LoloCOINs umgewandelt.');
      }
    }


  bookCoupon(){
    this.pointservice.cashCoupon(this.couponCode).subscribe(result =>{
      console.log("Coupon Gutgeschrieben:" + result);
      alert("Der Gutschein wurde eingelöst.");
      this.showToast('success','Gutschein verbucht','Glückwunsch der Gutschein wurde erfolgreich eingereicht und wurde beim Kunden wieder deaktiviert..');
      this.activeModal.close();
  })
}

  justClose(){
    this.activeModal.close();
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
