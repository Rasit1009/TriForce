import { Component, ChangeDetectorRef} from '@angular/core';

import { MENU_ITEMS, MENU_ITEMS_SELLER, MENU_ITEMS_FIRST } from './pages-menu';
import { ScChoiceComponent } from './sc-choice/sc-choice.component';
import { AfterViewInit, OnInit, OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from '../auth/auth.service';
import { PersonService, Person } from './datacomplete_consumer/services/person.service';
import { Http } from '@angular/http';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>     
      <nb-menu [items]="consumer" *ngIf="!isSeller&&!vorhanden"></nb-menu>
      <nb-menu [items]="seller" *ngIf="isSeller&&!vorhanden"></nb-menu>
      <nb-menu [items]="first" *ngIf="vorhanden"></nb-menu> 
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

  constructor(public auth : AuthService){

  }
  
  ngOnInit() {
    this.auth.isPersonSource.subscribe(res => {
      this.person = res;
      try {
        this.isSeller = this.person.isSeller; 
        this.vorhanden = this.person.vorhanden; 
        console.log(this.person.i);
      } catch (error) {
        console.log("noch kein user da "); 
      }
    })
  
  }

  ngOnDestroy(){
    this.auth.isPersonSource.unsubscribe(); 
  }
}
