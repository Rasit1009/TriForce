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
    this.auth.isPersonSource.subscribe(res => {
      this.person = res;
      try {
        console.log(this.person.i);
      } catch (error) {
        console.log("noch kein user da "); 
      }
    })
  }

  public deleteClick(person: Person){
  }

  public savePeople(){
    var e1 = <HTMLInputElement> document.getElementById('r1');
    var e2 = <HTMLInputElement> document.getElementById('r2');
 
    var ischecked1 = e1.checked;
    var ischecked2 = e2.checked;

    if(ischecked1){
      this.person.gender = "weiblich"
    } else if(ischecked2){
      this.person.gender ="männlich"
    } else{
      this.person.gender="keine Angabe"
    }

  this.person.firstname = (<HTMLInputElement>document.getElementById("firstname")).value;
  this.person.lastname = (<HTMLInputElement>document.getElementById("lastname")).value; 
  this.person.street = (<HTMLInputElement>document.getElementById("street")).value;
  this.person.housenumber = (<HTMLInputElement>document.getElementById("housenumber")).value;
  this.person.city =  (<HTMLInputElement>document.getElementById("city")).value;
  this.person.plz =  (<HTMLInputElement>document.getElementById("plz")).value;
  this.person.day =  (<HTMLInputElement>document.getElementById("day")).value;
  this.person.month =  (<HTMLInputElement>document.getElementById("month")).value;
  this.person.year =  (<HTMLInputElement>document.getElementById("year")).value;
  this.person.familystatus =(<HTMLInputElement>document.getElementById("familystatus")).value;
  this.person.profession =(<HTMLInputElement>document.getElementById("profession")).value;
   this.auth.setNewUserData(this.person);
  }
  starRate = 2;
  heartRate = 4;
}
