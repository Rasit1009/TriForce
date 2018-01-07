import { Component } from '@angular/core';

import { MENU_ITEMS, MENU_ITEMS_SELLER, MENU_ITEMS_FIRST } from './pages-menu';
import { ScChoiceComponent } from './sc-choice/sc-choice.component';
import { AfterViewInit, OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from '../auth/auth.service';
import { PersonService, Person } from './datacomplete_consumer/services/person.service';
import { Http } from '@angular/http';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="consumer" *ngIf="!isSeller && !isFirst"></nb-menu>
      <nb-menu [items]="seller" *ngIf="isSeller && !isFirst"></nb-menu>     
      <nb-menu [items]="first" *ngIf="isFirst"></nb-menu> 
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit{


  isSeller : boolean = false;
  id : any; 
  isFirst : boolean = false; 
  people : Person[] = []; 
  person = new Person(null,false,false);
  token : any; 

  
constructor(private auth : AuthService, private personService : PersonService, private http : Http){
}

ngOnInit(): void {

  try {
    this.token = localStorage.getItem("id_token");
    this.token = this.auth.decode(this.token);
    this.personService.getPeople().subscribe(res =>{ 
      this.people = res; 
      this.person = res.find(x => x.i === this.token);
        this.isSeller = this.person.isSeller; 
        this.isFirst = this.person.vorhanden; 
    });
  }
  catch (error) {
    alert("NICHT EINGELOGGT");
  }
}

getSeller(){
  if(this.auth.email == 'seller@test.de'){
    return this.isSeller = true;
  }
}

getLogin(){
  return this.auth.id; 
}

getFirstLogin(da : string){
  alert("in der methode 1");
  if(da.toString() == 'true'){  
    this.isFirst = true;
    alert(this.isFirst);
  } else {
    this.isFirst = false;
    alert("in der methode 3"); 
  }
  return this.isFirst; 
}

isFirstLogin(){
return this.isFirst;
}

getSC(){

  return true; 
}
  
  consumer = MENU_ITEMS;
  seller = MENU_ITEMS_SELLER;
  first = MENU_ITEMS_FIRST;
}
