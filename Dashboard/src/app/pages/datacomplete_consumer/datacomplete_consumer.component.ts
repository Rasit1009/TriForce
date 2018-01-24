import { Component } from '@angular/core';
import { Person } from './services/person.service';
import { AuthService } from '../../auth/auth.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';


@Component({
  selector: 'ngx-datacomplete-consumer',
  styleUrls: ['./datacomplete_consumer.component.scss'],
  templateUrl: './datacomplete_consumer.component.html',
})
export class Datacomplete_ConsumerComponent {

  person : Person = this.auth.person;
  completion_value : number = 0;

  constructor(private toasterService: ToasterService, public auth : AuthService){
    this.auth.isPersonSource.subscribe(res => {
      this.person = res;
      try {
        if(this.person.firstname){
          console.log(this.person.firstname);
          this.completion_value = this.completion_value + (100/8);
        }
        if(this.person.lastname){
          console.log(this.person.lastname);
          this.completion_value = this.completion_value + (100/8);
        }
        if(this.person.street && this.person.housenumber){
          console.log(this.person.street);
          console.log(this.person.housenumber);
          this.completion_value = this.completion_value + (100/8);
        }
        if(this.person.city && this.person.plz){
          console.log(this.person.city);
          console.log(this.person.plz);
          this.completion_value = this.completion_value + (100/8);
        }
        if(this.person.day && this.person.month && this.person.year){
          console.log(this.person.day);
          console.log(this.person.month);
          console.log(this.person.year);
          this.completion_value = this.completion_value + (100/8);
        }
        if(this.person.profession){
          console.log(this.person.profession);
          this.completion_value = this.completion_value + (100/8);
        }
        if(this.person.familystatus){
          console.log(this.person.familystatus);
          this.completion_value = this.completion_value + (100/8);
        }
        if(this.person.gender){
          console.log(this.person.gender);
          this.completion_value = this.completion_value + (100/8);
        }
        console.log(this.person.i);
      } catch (error) {
        console.log("noch kein user da "); 
      }
    });

    if(this.completion_value == 100){
      setTimeout(() => { this.showToast('sucess', 'Vollständige Daten', 'Deine Daten sind vollständig. Du kannst diese jederzeit ändern und aktualisieren.');}, 1000);
    } if(this.completion_value != 100){
      setTimeout(() => { this.showToast('info', 'Unvollständig Daten', 'Bitte vervollständige deine Daten um mehr Punkte zu sammeln.');}, 1000);
    }

   // this.initToasts();
  }

  public ngOnInit(): void{


  }


//---------------------------------------------TOAST START----------------------------------------------------
datenaktualisieren: boolean = true;


  initToasts(){
    //function call delay for fade-in effect mhendric 18.01.18

    if(this.datenaktualisieren){
      setTimeout(() => { this.showToast('sucess', 'Aktualisieren', 'Hier können Sie für eine bessere Kundenbindung Ihre Daten aktualisieren.');}, 1000);
    } 
    
      }

  config: ToasterConfig;

  position = 'toast-top-right';
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
