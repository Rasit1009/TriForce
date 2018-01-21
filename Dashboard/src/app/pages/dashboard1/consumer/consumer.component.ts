import { Component } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Points, PointService } from '../../points/points.service';
import { AuthService } from '../../../auth/auth.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import { Person, PersonService } from '../../datacomplete_consumer/services/person.service';
import { CouponSystem, Coupon } from '../../coupon/coupon.service';
import { CreditService, Credit } from '../../points/credit.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';


import 'style-loader!angular2-toaster/toaster.css';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ngx-consumer',
  styleUrls: ['./consumer.component.scss'],
  templateUrl: './consumer.component.html',
})

export class ConsumerComponent {
  [x: string]: any;
  activeValue: any;
  seller : Points[] = [];
  lastseller : Points[] = [];
  text : string; 
  sellerID : number; 
  test="hallo"; 
  gespart = 0; 
  index: number = 0;
  missingPoints: number = 0;
  coupon: Coupon[] = [];
  couponSystem: CouponSystem[] = [];
  isPersonSource = new BehaviorSubject<Points[]>(null);
  _currentSellerList: Observable<Points[]> = this.isPersonSource.asObservable().first();
  public credit: Credit = new Credit(null, null, null);
  creditid: string;
  selleri: number;
  isCreditSource = new BehaviorSubject<string>(null);
  _currentCredit: Observable<string> = this.isCreditSource.asObservable().first();
  currentPoints : number; 
  maxPoints; 
  gesammelt = 0; 


  constructor(private modalService: NgbModal, public auth : AuthService, public pointsService : PointService,
     private toasterService: ToasterService, public creditService: CreditService) { 
    this.pointsService.getSeller(this.auth.id).subscribe(res => {
      this.seller = res;
      var zaehler = 0; 

      for(var i = 0; i<this.seller.length; i++){
        this.gesammelt = this.gesammelt + this.seller[i].points; 
      }
      for(var i = this.seller.length; i>this.seller.length-4; i--){
        this.lastseller[zaehler] = this.seller[i];
        zaehler++;
      }
      console.log(this.seller);
      this.setUser(this.seller);

    });



    this.isPersonSource.subscribe(res => {
      try {
        this.pointsService.getSystem(this.seller).subscribe(res => {
          this.couponSystem = res;
        });
      } catch (error) {
      }
    });
  }
  setUser(person: Points[]) {
    this.isPersonSource.next(person);
  }

  setCredit(creditid : string){
    this.isCreditSource.next(creditid);
  }

  getSellerPic(seller: Points) {
    this.test = this.auth.people.find(x => x.i === seller.selleri).imagepath;
    return this.test;
  }

  getSellerTextByID(user: Points) {
    var text: string;
    this.text = text;
    return this.text;
  }

  //Hier sollen die Daten mittels SellerID aus der Datenbank ausgelesen werden, momentan Mockup
  getSellerName(sellerID: string) {
    return sellerID;
  }
  getCredit(creditid: string) {
    console.log(creditid);
    return creditid;
  }
  getSellerText(sellerID: string) {
    return sellerID;
  }
  getEarnedPoints(sellerID: number) {
    return sellerID;
  }

  getCouponText(sellerID: string) {
    return sellerID;
  }
  getCouponDetail(sellerID: string) {
    return sellerID;
  }

  getMissingPoints(sellerID: number) {
    return sellerID;
  }

  returnMissingPoints() {
    return this.missingPoints;
  }

    showLargeModal(sellerID: Points) {
      console.log(sellerID);
      console.log(sellerID.selleri);
      sellerID = this.seller.find(x => x.selleri === sellerID.selleri);
      this.selleri = sellerID.selleri;
      console.log(this.selleri);
      sellerID.points;
      console.log(sellerID.points);
      var businessname = this.auth.people.find(x => x.i === sellerID.selleri).businessname;
      var text = this.auth.people.find(x => x.i === sellerID.selleri).text;
      var maxPoints = this.couponSystem.find(x => x.selleri === sellerID.selleri).number;
      this.maxPoints = maxPoints; 
      //subscription dass maxPoints gesetzt werden 

      var currentPoints = sellerID.points / maxPoints * 100;
      this.currentPoints = currentPoints; 
      var couponText = this.couponSystem.find(x => x.selleri === sellerID.selleri).coupontext;
      var couponDetail = this.couponSystem.find(x => x.selleri === sellerID.selleri).coupondetail;
      var missingPoints = maxPoints - sellerID.points;
      this.missingPoints = missingPoints;
      if(this.missingPoints <= 0){
      this.CreateCredit();
    }
      try {
        const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
        activeModal.componentInstance.modalSellername = this.getSellerName(businessname); //Name mit SellerID aus Datenbank auslesen
        activeModal.componentInstance.modalSellertext = this.getSellerText(text); //Text mit SellerID aus Datenbank auslesen
        activeModal.componentInstance.modalCollectedpoints = this.getEarnedPoints(currentPoints); //Anzahl gesammelter Items mit SellerID aus Datenbank auslesen (max. 10)
        //activeModal.componentInstance.modal
        activeModal.componentInstance.modalCouponDetail = this.getCouponDetail(couponDetail);
        activeModal.componentInstance.modalCoupontext = this.getCouponText(couponText);
        activeModal.componentInstance.modalMissingPoints = this.getMissingPoints(missingPoints);
        activeModal.componentInstance.value = currentPoints; 
        activeModal.componentInstance.remaining = missingPoints; 
  
        
        //subscription bis Observable des Credits zurückkommt, damit credit nie leer ist
        this.isCreditSource.subscribe(res=> {
          if(this.creditid){
            try {
              if(missingPoints <= 0){
          activeModal.componentInstance.modalCredit = this.getCredit(this.creditid);
          activeModal.componentInstance.qr = this.creditid; 
        }
            } catch (error) {
              
            }
          
          }
        });
        
      } catch (error) {
  
      }
  
    }
    //Methode, die wenn der Button Gutschein anzeigen gelickt wird, die Userid und Sellerid postet, damit ein Gutschein in der Datenbank erzeugt wird
    CreateCredit() {
      //selleri wird noch nicht richtig ausgelesen
  
      // this.credit.selleri = this.seller.find(x=>x.selleri === this.credit.selleri); -> hier nicht nötig da selleri bereits vorher gezogen werden kann
      this.credit.selleri = this.selleri; 
      this.credit.useri = this.auth.id;
      console.log(this.credit);
      this.creditService.sendCredit(this.credit).subscribe(res => { 
        this.creditid = res.text();
        this.setCredit(this.creditid);
        console.log(this.creditid) });
    }

    getModalValue(){
      return this.activeValue;
    }
    showSmallModal() {
      const activeModal = this.modalService.open(ModalComponent, { size: 'sm', container: 'nb-layout' });
  
      activeModal.componentInstance.modalHeader = 'Small Modal';
    }
  
    showStaticModal() {
      const activeModal = this.modalService.open(ModalComponent, {
        size: 'sm',
        backdrop: 'static',
        container: 'nb-layout',
      });
  
      activeModal.componentInstance.modalHeader = 'Static modal';
      activeModal.componentInstance.modalContent = `This is static modal, backdrop click
                                                      will not close it. Click × or confirmation button to close modal.`;
    }
  


    //---------------------------------------------TOAST START----------------------------------------------------
datennochnichtvollstaendig: boolean = true;
nochnichtirgendwoeingekauft: boolean = true;
gutscheinverfuegbar: boolean = true;
ersteanmeldung: boolean = true;



  initToasts(){
    //function call delay for fade-in effect mhendric 18.01.18
    if(this.ersteanmeldung){
      setTimeout(() => { this.showToast('sucess', '♥-lich Willkommen', 'Gleich hast du es geschafft und kannst mit dem Sparen loslegen.');}, 1000);
    }   if(this.datennochnichtvollstaendig){
        setTimeout(() => { this.showToast('info', 'Profil nicht vollständig', 'Bitte vervollständige Dein Profil. (Daten verwalten)');}, 2000);
      } if (this.gutscheinverfuegbar){
        setTimeout(() => { this.showToast('success', 'Gutschein vorhanden', 'Du hast genug LOLOCoin gesammelt und einen Gutschein freigeschaltet,');}, 4000);
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


  private showToast(type: string, title: string, body: string) {
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
