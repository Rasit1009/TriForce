import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { AuthService } from '../../auth/auth.service';
import { Person, PersonService } from '../datacomplete_consumer/services/person.service';
import { Points, PointService } from '../points/points.service';
@Component({
  selector: 'app-seller-overview',
  templateUrl: './seller-overview.component.html',
  styleUrls: ['./seller-overview.component.scss']
})
export class SellerOverviewComponent{
  activeValue: any;
  seller : Points[] = [];
  text : string; 
  test="hallo"; 
  sellerID : number; 
  index : number = 0; 

  constructor(private modalService: NgbModal, public auth : AuthService, public pointsService : PointService) { 
    this.pointsService.getSeller(this.auth.id).subscribe(res=> {
    console.log(res);
    this.seller = res;
    console.log(this.seller);
    });
  }
        getSellerPic(seller : Points){
              this.test = this.auth.people.find(x=>x.i ===seller.selleri).imagepath;
              return this.test; 
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
