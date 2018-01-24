import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Person, PersonService } from '../datacomplete_consumer/services/person.service';
import { AuthService } from '../../auth/auth.service';
import { Http } from '@angular/http';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard1.component.scss'],
  templateUrl: './dashboard1.component.html',
})
export class Dashboard1Component implements OnInit{
  person : Person; 
  isSeller : boolean = false; 
  vorhanden : boolean = false; 
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
      } catch (error) {
        console.log("noch kein user da "); 
      }
    })
  }


ngOnInit(): void {

}
}
