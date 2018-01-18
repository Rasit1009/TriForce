import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../../auth/auth.service';
import { Person, PersonService } from '../datacomplete_consumer/services/person.service';


@Component({
  selector: 'app-sc-choice',
  templateUrl: './sc-choice.component.html',
  styleUrls: ['./sc-choice.component.scss']
})
export class ScChoiceComponent implements OnInit {

  person : Person = this.auth.person; 

  constructor(public auth : AuthService){

  }

  ngOnInit() {
  }
 
  weiter(){
   var e1 = <HTMLInputElement> document.getElementById('r1');
   var e2 = <HTMLInputElement> document.getElementById('r2');

   var ischecked1 = e1.checked;
   var ischecked2 = e2.checked;

   if(ischecked1){
     this.person.isSeller = true;
     this.person.vorhanden = false;  
     this.person.email = this.auth.email;
     this.auth.setNewUserData(this.person); 
     this.auth.setUser(this.person);
  }
   else if(ischecked2){
     this.person.isSeller = false; 
     this.person.vorhanden = false; 
     this.person.email = this.auth.email;
     this.auth.setNewUserData(this.person); 
     this.auth.setUser(this.person);
     
   }
   else{
   }
   
 
    
  }

}
