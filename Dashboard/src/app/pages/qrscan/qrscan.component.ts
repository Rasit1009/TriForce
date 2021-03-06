import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './modal.component';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';
import { AuthService } from '../../auth/auth.service';
import { PointService, Points } from '../points/points.service';
import { CouponService, CouponSystem } from '../coupon/coupon.service';

@Component({
  selector: 'ngx-qrscan',
  styleUrls: ['./qrscan.component.scss'],
  templateUrl: './qrscan.component.html',
})
export class QrscanComponent {
  points : Points = new Points(null,null,null);
  couponText; 
  coupon : CouponSystem;
  
  

  constructor(private modalService: NgbModal, public toasterService: ToasterService, public auth: AuthService, 
    public pointservice : PointService, public couponSystem : CouponService) { 


   // this.initToasts();

  }

  showLargeModal() {
    const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Large Modal';
  }


  showSmallModal(codestring, valid?) {
    var collectCode; 
    var couponCode; 
  console.log(codestring);
//Unterscheidung Gutschein oder Sammelcode
    //Sammelcode
    if(valid){
    if(codestring.indexOf("auth") >= 0){
      collectCode = codestring; 
    //Gutschein
    } else {
      
      couponCode = codestring; 
    } 
  }
  
      

    if(collectCode){
      const activeModal = this.modalService.open(ModalComponent, { size: 'sm', container: 'nb-layout'});
        activeModal.componentInstance.modalHeader = 'Punkte sammeln';      
        activeModal.componentInstance.collectCode = collectCode;
        console.log(this.auth.id);
        activeModal.componentInstance.sellerid = this.auth.id; 
    }
     else if(couponCode){
      this.couponSystem.getCoupon(this.auth.id).subscribe(result => {
        this.coupon = result; 
        console.log(result);
        const activeModal = this.modalService.open(ModalComponent, { size: 'sm', container: 'nb-layout'});
        activeModal.componentInstance.modalHeader = 'Gutschein einlösen';      
        activeModal.componentInstance.couponCode = couponCode;
        activeModal.componentInstance.couponText = this.coupon.coupontext; 
        activeModal.componentInstance.coupondetail = this.coupon.coupondetail; 
      })
    } else if(!valid){ 
      const activeModal = this.modalService.open(ModalComponent, { size: 'sm', container: 'nb-layout'});
      activeModal.componentInstance.modalHeader = 'Gutschein ungültig';      
     // activeModal.componentInstance.couponCode = couponCode;
    }
  //  activeModal.componentInstance.couponid = 
    
    
    
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
