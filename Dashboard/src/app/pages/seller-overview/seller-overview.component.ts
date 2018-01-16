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
export class SellerOverviewComponent {
  activeValue: any;
  seller : Points[] = [];
  sellerList : Person[] = []; 


  constructor(private modalService: NgbModal, public auth : AuthService, public pointsService : PointService) { 

    this.pointsService.getSeller(this.auth.id).subscribe(res=> {
      console.log(res);
    this.seller = res[0];
    console.log(this.seller);
    this.sellerList = this.auth.getSeller(this.seller);
    console.log(this.sellerList);
    });
  
  }

  
          //Hier sollen die Daten mittels SellerID aus der Datenbank ausgelesen werden, momentan Mockup
          getSellerName(sellerID : number){
            if (sellerID == 1) return "Klein's Backstube"
            if (sellerID == 2) return "Brunsing & Brunsing Friseure"
            if (sellerID == 3) return "Joey Pepperoni Pizza"
            if (sellerID == 4) return "König Döner & Pizza"
            if (sellerID == 5) return "Happiness Boutique"
            if (sellerID == 6) return "vitalis - Sport und Wellness"
            if (sellerID == 7) return "Museum Ludwig"
            if (sellerID == 8) return "The Copyshop"
            if (sellerID == 9) return "Sonnen Apotheke"
            if (sellerID == 10) return "LastCoolPizza"
            if (sellerID == 11) return "BR Elektronik"
            if (sellerID == 12) return "HandyDoc"
            else return "Sellername"
          }
          getSellerText(sellerID : number){
            if(sellerID == 1) return "Bäckerfrische seit 1872"
            if (sellerID == 2) return "Ihre Frisur, Ihr Stil!"
            if (sellerID == 3) return "American Pizza - Finger Lickin' Good"
            if (sellerID == 4) return "Spieß(ig) gut!"
            if (sellerID == 5) return "Kleider machen Freude!"
            if (sellerID == 6) return "Der Ort für Gesundheit und Wohlbefinden"
            if (sellerID == 7) return "Kunst & Kultur in Köln"
            if (sellerID == 8) return "Buntes Vergnügen"
            if (sellerID == 9) return "Ihre Gesundheit ist unser Fokus"
            if (sellerID == 10) return "LastCoolPizza"
            if (sellerID == 11) return "Ihr Partner, für HiFI, TV und Internet"
            if (sellerID == 12) return "Gut, Schnell, Günstig!"
            else return "Sellertext"
          }
          getEarnedPoints(sellerID : number){
            if(sellerID == 1) return 3
            if (sellerID == 2) return 10
            if (sellerID == 3) return 4
            if (sellerID == 4) return 5
            if (sellerID == 5) return 6
            if (sellerID == 6) return 10
            if (sellerID == 7) return 10
            if (sellerID == 8) return 3
            if (sellerID == 9) return 7
            if (sellerID == 10) return 10
            if (sellerID == 11) return 8
            if (sellerID == 12) return 6
            else return 3
          }

    showLargeModal(sellerID : number) {
      const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });

      activeModal.componentInstance.modalSellername = this.getSellerName(sellerID); //Name mit SellerID aus Datenbank auslesen
      activeModal.componentInstance.modalSellertext = this.getSellerText(sellerID); //Text mit SellerID aus Datenbank auslesen
      activeModal.componentInstance.modalCollectedpoints = this.getEarnedPoints(sellerID); //Anzahl gesammelter Items mit SellerID aus Datenbank auslesen (max. 10)

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
