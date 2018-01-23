//our root app component
import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {CommonModule} from '@angular/common';
import {NgxZxingModule} from 'ngx-zxing';
import {FormsModule} from "@angular/forms";
import { Alert } from 'selenium-webdriver';
import { AuthService } from '../../../auth/auth.service';
import { Points, PointService } from '../../points/points.service';
import { QrscanComponent } from '../qrscan.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-tabs',
  styleUrls: ['./tabs.component.scss'],
  templateUrl: './tabs.component.html',
})
export class TabsComponent {
  public point : Points = new Points(null,null,null);

constructor(public auth : AuthService, public pointService : PointService, public scanni: QrscanComponent, public toastparty: QrscanComponent){

}

  camStarted = false;
  selectedDevice = undefined;
  qrResult = "";
  availableDevices = [];
  auth0 = "auth0|";
   
  displayCameras(cams: any[]) {
    this.availableDevices = cams;
    console.log("Devices",cams);
    if(cams && cams.length > 0) {
      this.selectedDevice = cams[0];
      this.camStarted = true;
    }
  }
  
  handleQrCodeResult(result: string) {
    console.log("Result", result);
    //QR CODE RESULT
    this.qrResult = result;

    


    this.scanni.showSmallModal(result);
  }
  
  onChange(selectedValue: string){
    console.log("Selection changed",selectedValue);
    this.camStarted = false;
    this.selectedDevice = selectedValue;
    this.camStarted = true;
  }
seller_id: string;
amount_id: string;
consumer_id: string;
amount: any;
sellerid: any;
consumerid: any;
textvalue: any;
textvalue_id: string;
coupon; 
coupon_id; 

indb(){
//this.geklickt()

    /*
    this.coupon = document.getElementById("coupon");
    this.coupon_id = this.coupon.value; */

    this.textvalue = document.getElementById("consumerid");
    this.textvalue_id = this.textvalue.value;
    this.handleQrCodeResult(this.textvalue_id);

    /*this.amount = document.getElementById("amount");
    this.amount_id = this.amount.value;
    this.point.useri = this.textvalue_id;
    this.point.points = this.amount_id;
    this.point.selleri = this.auth.person.i; */

   // this.point.useri = this.textvalue_id; 
    
   /*
    if(this.textvalue_id.indexOf("auth") >= 0){ 
      this.pointService.sendPoints(this.point).subscribe(()=>alert("Punkte versandt"));
    } else {
      this.pointService.cashCoupon(this.coupon_id).subscribe(()=>alert("gutgeschrieben"));
    }*/

    //this.consumerid = document.getElementById("consumerid");
    //this.consumer_id = this.qrResult;
    //this.sellerid = this.auth.person.i;
}


datenkorrekteingegeben: boolean = true;
geklickt(){
  if (this.datenkorrekteingegeben){
    //this.toastparty.showToast('success','lala','k');
    alert('Aktion erfolgreich');
    setTimeout(() => { window.location.reload();}, 0);
    
    
  } if (!this.datenkorrekteingegeben){
    alert("Daten falsch eingegeben, bitte überprüfe deine Eingaben.")
  }

}
}

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    NgxZxingModule.forRoot()
  ],
  declarations: [ TabsComponent ],
  bootstrap: [ TabsComponent ]
})
export class AppModule {}