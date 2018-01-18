import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { AuthService } from '../../auth/auth.service';
import { Person, PersonService } from '../datacomplete_consumer/services/person.service';
import { Points, PointService } from '../points/points.service';
import { CouponSystem, Coupon } from '../coupon/coupon.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {Observable, BehaviorSubject} from'rxjs/Rx';
@Component({
  selector: 'app-seller-overview',
  templateUrl: './seller-overview.component.html',
  styleUrls: ['./seller-overview.component.scss']
})
export class SellerOverviewComponent{
  activeValue: any;
  seller : Points[];
  text : string; 
  test="hallo"; 
  sellerID : number; 
  index : number = 0; 
  missingPoints : number = 0; 
  coupon : Coupon[] = []; 
  couponSystem : CouponSystem[] = []; 
  isPersonSource = new BehaviorSubject<Points[]>(null);
  _currentSellerList : Observable<Points[]> = this.isPersonSource.asObservable().first(); 





  constructor(private modalService: NgbModal, public auth : AuthService, public pointsService : PointService) { 
    this.pointsService.getSeller(this.auth.id).subscribe(res=> {
    this.seller = res;
    this.setUser(this.seller);
    });

    this.isPersonSource.subscribe(res => {   
      try {
        console.log("einmal nur der hier");
        this.pointsService.getSystem(this.seller).subscribe(res=>{
          this.couponSystem = res; 
        });
      } catch (error) {
      }
    });
  }
  setUser(person: Points[]) {
    this.isPersonSource.next(person);
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

          getCouponText(sellerID : string){
            return sellerID; 
          }
          getCouponDetail(sellerID : string){
            return sellerID; 
          }

          getMissingPoints(sellerID : number){
            return sellerID; 
          }

          returnMissingPoints(){
            return this.missingPoints;
          }


    showLargeModal(sellerID : Points) {
      console.log(sellerID);
      console.log(sellerID.selleri);
      sellerID = this.seller.find(x=>x.selleri === sellerID.selleri);
      sellerID.points;
      console.log(sellerID.points);
      var businessname = this.auth.people.find(x=>x.i ===sellerID.selleri).businessname;
      var text = this.auth.people.find(x=>x.i ===sellerID.selleri).text;
      var maxPoints = this.couponSystem.find(x=>x.selleri===sellerID.selleri).number;
      var currentPoints = sellerID.points/maxPoints*100;
      var couponText = this.couponSystem.find(x=>x.selleri ===sellerID.selleri).coupontext;
      var couponDetail = this.couponSystem.find(x=>x.selleri === sellerID.selleri).coupondetail;
      var missingPoints = maxPoints - currentPoints; 
      this.missingPoints = missingPoints; 
      try {
        const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
         activeModal.componentInstance.modalSellername = this.getSellerName(businessname); //Name mit SellerID aus Datenbank auslesen
         activeModal.componentInstance.modalSellertext = this.getSellerText(text); //Text mit SellerID aus Datenbank auslesen
         activeModal.componentInstance.modalCollectedpoints = this.getEarnedPoints(currentPoints); //Anzahl gesammelter Items mit SellerID aus Datenbank auslesen (max. 10)
         //activeModal.componentInstance.modal
         activeModal.componentInstance.modalCouponDetail = this.getCouponDetail(couponDetail);
         activeModal.componentInstance.modalCoupontext = this.getCouponText(couponText);
         activeModal.componentInstance.modalMissingPoints = this.getMissingPoints(missingPoints);

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
