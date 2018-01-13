//our root app component
import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {CommonModule} from '@angular/common';
import {NgxZxingModule} from 'ngx-zxing';
import {FormsModule} from "@angular/forms";
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'ngx-tabs',
  styleUrls: ['./tabs.component.scss'],
  templateUrl: './tabs.component.html',
})
export class TabsComponent {
  
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

indb(){


    this.sellerid = document.getElementById("sellerid");
    this.seller_id = this.sellerid.value;

    this.amount = document.getElementById("amount");
    this.amount_id = this.amount.value;

    this.consumerid = document.getElementById("consumerid");
    this.consumer_id = this.consumerid.value;


  alert('An den Händler ' + this.seller_id + ' wurde der Betrag ' + this.amount_id + ' für den Kunden mit der ID ' + this.consumer_id + ' gutgeschrieben.');
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