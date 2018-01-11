import { Component, OnInit } from '@angular/core';
import { Person, PersonService } from '../services/person.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'ngx-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  
  person : Person = this.auth.person;

  constructor(public auth : AuthService){

  }

  public ngOnInit(): void{

  }

  public deleteClick(person: Person){
  }

  public savePeople(){
  this.person.firstname = (<HTMLInputElement>document.getElementById("firstname")).value;
  this.person.lastname = (<HTMLInputElement>document.getElementById("lastname")).value;
   this.auth.setNewUserData(this.person);
  }
  starRate = 2;
  heartRate = 4;
}
