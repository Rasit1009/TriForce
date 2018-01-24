import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {Observable} from 'rxjs';
import { Http } from '@angular/http/';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-qrgenerate',
  styleUrls: ['./qrgenerate.component.scss'],
  templateUrl: './qrgenerate.component.html',
})
export class QrgenerateComponent{
  elementType : 'url' | 'canvas' | 'img' = 'url';
  value : string = this.auth.id;
  text1 : any; 
  isScanned : boolean = false; 

  constructor(public auth : AuthService, public http : Http, public toasterService: ToasterService){
    Observable.interval(1000).subscribe(x=>{
      this.listen().subscribe(res=> {
      this.isScanned = res;
      if(this.isScanned){
        this.showToast('success','Punkte gutgeschrieben','Glückwunsch, dein Händler hat dir LoloCOINs gutgeschrieben');
      }
      }); 
    });
  }

  listen() : Observable<any>{
    return this.http
    .get('https://lolocoback.azurewebsites.net/api/users/getScanned/' + this.auth.id)
    .map(r=>r.json());
  }

  updateData(){
    this.text1 = document.getElementById("text1");
    this.value = this.text1.value;
  }

  setNewQr(value : string){
    this.value = value; 
  }

  

 //---------------------------------------------TOAST START----------------------------------------------------
 datennochnichtvollstaendig: boolean = true;
 nochnichtirgendwoeingekauft: boolean = true;
 gutscheinverfuegbar: boolean = true;
 ersteanmeldung: boolean = true;
 
 
 
   initToasts(){
     //function call delay for fade-in effect mhendric 18.01.18
     if(this.ersteanmeldung){
       setTimeout(() => { this.showToast('sucess', 'Willkommen im Scanner', 'Hier kannst du LoloCOINs gutschreiben und LoloCOUPONs einlösen.');}, 1000);
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
 
 
   public showToast(type: string, title: string, body: string) {
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
