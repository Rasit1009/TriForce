import { Component } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Points, PointService } from '../../points/points.service';
import { AuthService } from '../../../auth/auth.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-consumer',
  styleUrls: ['./consumer.component.scss'],
  templateUrl: './consumer.component.html',
})

export class ConsumerComponent {
  [x: string]: any;
  activeValue: any;
  seller : Points[] = [];
  text : string; 
  sellerID : number; 
  test="hallo"; 
  gespart = 0; 

  constructor(private modalService: NgbModal, public auth : AuthService, public pointsService : PointService, private toasterService: ToasterService) { 

    this.pointsService.getSeller(this.auth.id).subscribe(res=> {
    console.log(res);
    this.seller = res;
    console.log(this.seller[0].points);
    console.log(this.seller[1].points);
    for(var i = 0; i<this.seller.length;i++){
      this.gespart = this.gespart + this.seller[i].points;
    }
    console.log(this.seller);
    });

    
    this.initToasts();
  }

  getSellerPic(seller : Points){
    this.test = this.auth.people.find(x=>x.i ===seller.selleri).imagepath;
    return this.test; 
}
        getSellerNameByID(user : Points){

          return this.text; 
        }

        getSellerTextByID(user : Points){
          var text : string; 
          this.text = text; 
          return this.text; 
        }
  
          //Hier sollen die Daten mittels SellerID aus der Datenbank ausgelesen werden, momentan Mockup
          getSellerName(sellerID : string){
           return sellerID; 
          }
          getSellerText(sellerID : string){
            return sellerID; 
          }
          getEarnedPoints(sellerID : number){
            return sellerID; 
          }
    getPoints(sellerID : Points){
      if(sellerID.points == 10){
        return true; 
      } else {
        return false; 
      }
    }

    showLargeModal(sellerID : Points) {
      console.log(sellerID);
      console.log(sellerID.selleri);
      sellerID = this.seller.find(x=>x.selleri === sellerID.selleri);
      sellerID.points;
      console.log(sellerID.points);
      var businessname = this.auth.people.find(x=>x.i ===sellerID.selleri).businessname;
      var text = this.auth.people.find(x=>x.i ===sellerID.selleri).text;
     
      try {
        const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
         activeModal.componentInstance.modalSellername = this.getSellerName(businessname); //Name mit SellerID aus Datenbank auslesen
         activeModal.componentInstance.modalSellertext = this.getSellerText(text); //Text mit SellerID aus Datenbank auslesen
         activeModal.componentInstance.modalCollectedpoints = this.getEarnedPoints(sellerID.points); //Anzahl gesammelter Items mit SellerID aus Datenbank auslesen (max. 10)

      } catch (error) {
        
      }
     
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
