//our root app component
import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {CommonModule} from '@angular/common';
import {NgxZxingModule} from 'ngx-zxing';
import {FormsModule} from "@angular/forms";
import { Alert } from 'selenium-webdriver';
import { AuthService } from '../../../auth/auth.service';
import { Points, PointService } from '../../points/points.service';

@Component({
  selector: 'ngx-tabs',
  styleUrls: ['./tabs.component.scss'],
  templateUrl: './tabs.component.html',
})
export class TabsComponent {
  public point : Points = new Points(null,null,null);

constructor(public auth : AuthService, public pointService : PointService){
}

  camStarted = false;
  selectedDevice = undefined;
  qrResult = "";
  availableDevices = [];
   
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

indb(){



    this.amount = document.getElementById("amount");
    this.amount_id = this.amount.value;

    this.textvalue = document.getElementById("consumerid");
    this.textvalue_id = this.textvalue.value;
    this.point.points = this.amount_id;
    this.point.selleri = this.auth.person.i; 
    this.point.useri = this.qrResult; 
    this.point.useri = this.textvalue_id;

    this.pointService.sendPoints(this.point).subscribe();

    //this.consumerid = document.getElementById("consumerid");
    //this.consumer_id = this.qrResult;
    //this.sellerid = this.auth.person.i;

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