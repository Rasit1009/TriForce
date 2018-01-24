import { Component } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from '../../auth/auth.service';
import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import {Observable} from'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
  selector: 'ngx-dashboard2',
  styleUrls: ['./dashboard2.component.scss'],
  templateUrl: './dashboard2.component.html',
})
export class Dashboard2Component{


//---------------------------------------------TOAST START----------------------------------------------------
datennochnichtvollstaendig: boolean = true;
wurdebeidirschoneingekauft: boolean = true;
gutscheinsystemnochnichtausgefuellt: boolean = true;
ersteanmeldung: boolean = true;
allegutscheineMoneyvalue = 0;
anzahllolocoins = 0;
anzahlgutscheine =0;

  constructor(private toasterService: ToasterService, private auth: AuthService,private http: Http) {

    this.initToasts();
    try {
      this.getValue(this.auth.id).subscribe(res => { 
        this.allegutscheineMoneyvalue= res;
        //this.setDay(this.day);
        
        console.log(this.allegutscheineMoneyvalue+"Value"); });
    } catch (error) {
      console.log("error");
    }
    try {
      this.getDay(this.auth.id).subscribe(res => { 
        this.anzahllolocoins= res;
        //this.setDay(this.day);
        
        console.log(this.anzahllolocoins +"Lolocoins");
        
      });
    } catch (error) {
      console.log("error");
    }

    try {
      this.getCredit(this.auth.id).subscribe(res => { 
        this.anzahlgutscheine= res;
        //this.setDay(this.day);
        
        console.log(this.anzahlgutscheine +"gutscheine");
        
      });
    } catch (error) {
      console.log("error");
    }
  }

  
    public getDay(id : any): Observable<any>{
      return this.http
            .get('http://localhost:49873/api/coupon/getAllPoints/' + id)
            .map(r =>r.json());
     }
     public getValue(id : any): Observable<any>{
      return this.http
            .get('http://localhost:49873/api/credit/getAllCreditValue/' + id)
            .map(r =>r.json());
     }
     public getCredit(id : any): Observable<any>{
      return this.http
            .get('http://localhost:49873/api/credit/getAllCredit/' + id)
            .map(r =>r.json());
     }
  

  initToasts(){
    //function call delay for fade-in effect mhendric 18.01.18

    if(this.ersteanmeldung){
      setTimeout(() => { this.showToast('sucess', '♥-lich Willkommen', 'Du hast es fast geschafft, digitalisiere jetzt dein Unternehmen.');}, 1000);
    }   if(this.datennochnichtvollstaendig){
        setTimeout(() => { this.showToast('info', 'Profil nicht vollständig', 'Bitte vervollständigen Sie Ihr Profil. (Daten verwalten)');}, 2000);
      } if (this.gutscheinsystemnochnichtausgefuellt){
        setTimeout(() => { this.showToast('error', 'Gutscheinsystem', 'Bitte wählen Sie Ihr individuelles Gutscheinsystem. (Gutschein verwalten)');}, 4000);
      } if (this.wurdebeidirschoneingekauft){
        setTimeout(() => { this.showToast('success', 'Glückwunsch', 'Deine Kunden sind glücklich bei dir LOLOCO nutzen zu können.');}, 3000);
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
