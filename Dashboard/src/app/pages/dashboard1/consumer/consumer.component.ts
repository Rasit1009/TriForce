import { Component } from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Points, PointService } from '../../points/points.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'ngx-consumer',
  styleUrls: ['./consumer.component.scss'],
  templateUrl: './consumer.component.html',
})
export class ConsumerComponent {
  activeValue: any;
  seller : Points[] = [];
  text : string; 
  sellerID : number; 

  constructor(private modalService: NgbModal, public auth : AuthService, public pointsService : PointService) { 

    this.pointsService.getSeller(this.auth.id).subscribe(res=> {
    console.log(res);
    this.seller = res;
    console.log(this.seller);
    });
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
  

    
  
  }
