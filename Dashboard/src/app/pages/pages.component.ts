import { Component, ChangeDetectorRef} from '@angular/core';

import { MENU_ITEMS, MENU_ITEMS_SELLER, MENU_ITEMS_FIRST, MENU_ITEMS_SELLER_COMPLETE, MENU_ITEMS_CONSUMER_COMPLETE } from './pages-menu';
import { ScChoiceComponent } from './sc-choice/sc-choice.component';
import { AfterViewInit, OnInit, OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from '../auth/auth.service';
import { PersonService, Person } from './datacomplete_consumer/services/person.service';
import { Http } from '@angular/http';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>     
      <nb-menu [items]="consumer" *ngIf="!s_complete && c_complete && !isSeller && !vorhanden"></nb-menu>
      <nb-menu [items]="seller" *ngIf="!c_complete && s_complete && isSeller && !vorhanden"></nb-menu>
      <nb-menu [items]="first" *ngIf="vorhanden"></nb-menu> 
      <nb-menu [items]="sellercomplete" *ngIf="!c_complete && !s_complete && isSeller && !vorhanden"></nb-menu> 
      <nb-menu [items]="consumercomplete" *ngIf="!c_complete && !s_complete && !isSeller && !vorhanden"></nb-menu> 
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit{

  person : Person; 
  isSeller : boolean = false; 
  vorhanden : boolean = false; 
  consumer = MENU_ITEMS; 
  seller = MENU_ITEMS_SELLER; 
  first = MENU_ITEMS_FIRST;
  sellercomplete = MENU_ITEMS_SELLER_COMPLETE;
  consumercomplete = MENU_ITEMS_CONSUMER_COMPLETE;
  s_complete : boolean = false;
  c_complete :boolean = false;  

  constructor(public auth : AuthService, public personService : PersonService){
    this.auth.isPersonSource.subscribe(res => {
      this.person = res;
      try {
        this.isSeller = this.person.isSeller; 
        this.vorhanden = this.person.vorhanden; 
        this.s_complete = this.auth.s_complete;
        this.c_complete = this.auth.c_complete; 
        console.log(this.person.i);
        console.log(this.s_complete);
        console.log(this.c_complete);
      } catch (error) {
        console.log("noch kein user da "); 
      }
    })
  }
  
  ngOnInit() {

  }

  ngOnDestroy(){
    this.auth.isPersonSource.unsubscribe(); 
  }
}
