import { Component } from '@angular/core';
import { Person } from '../datacomplete_consumer/services/person.service';
import { AuthService } from '../../auth/auth.service';
import { FileUploader } from 'ng2-file-upload';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'ngx-datacomplete',
  styleUrls: ['./datacomplete_seller.component.scss'],
  templateUrl: './datacomplete_seller.component.html',
})



export class Datacomplete_SellerComponent {

  person : Person = this.auth.person;
  completion_value : number = 0;


  constructor(private toasterService: ToasterService, public auth : AuthService){
    this.auth.isPersonSource.subscribe(res => {
      this.person = res;
      try {
        if(this.person.businessname){
          console.log(this.person.businessname);
          this.completion_value = this.completion_value + 10;
        }
        if(this.person.firstname){
          console.log(this.person.firstname);
          this.completion_value = this.completion_value + 10;
        }
        if(this.person.lastname){
          console.log(this.person.lastname);
          this.completion_value = this.completion_value + 10;
        }
        if(this.person.street && this.person.housenumber){
          console.log(this.person.street);
          console.log(this.person.housenumber);
          this.completion_value = this.completion_value + 10;
        }
        if(this.person.city && this.person.plz){
          console.log(this.person.city);
          console.log(this.person.plz);
          this.completion_value = this.completion_value + 10;
        }
        if(this.person.business && this.person.business != "Branche..."){
          console.log(this.person.business);
          this.completion_value = this.completion_value + 10;
        }
        if(this.person.text){
          console.log(this.person.text);
          this.completion_value = this.completion_value + 10;
        }
        if(this.person.imagepath){
          console.log(this.person.imagepath);
          this.completion_value = this.completion_value + 30;
        }
        console.log(this.person.i);
      } catch (error) {
        console.log("noch kein user da "); 
      }
    });

    if(this.completion_value == 100){
      setTimeout(() => { this.showToast('sucess', 'Vollständig', 'Ihre Daten sind vollständig. Sie können diese jederzeit ändern und aktualisieren');}, 1000);
    } if(this.completion_value != 100){
      setTimeout(() => { this.showToast('info', 'Unvollständig', 'Bitte vervollständigen Sie Ihre Daten für eine bessere Kundenbindung');}, 1000);
    }

   // this.initToasts();
  }

 /* Bilduploader 
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
*/
  

//---------------------------------------------TOAST START----------------------------------------------------
datenaktualisieren: boolean = true;


  initToasts(){
    //function call delay for fade-in effect mhendric 18.01.18

    if(this.datenaktualisieren){
      setTimeout(() => { this.showToast('sucess', 'Aktualisieren', 'Hier können Sie für eine bessere Kundenbindung Ihre Daten aktualisieren.');}, 1000);
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

