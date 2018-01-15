import { Component } from '@angular/core';
import { Person } from './services/person.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'ngx-datacomplete',
  styleUrls: ['./datacomplete_consumer.component.scss'],
  templateUrl: './datacomplete_consumer.component.html',
})
export class Datacomplete_ConsumerComponent {

  person : Person = this.auth.person;
  completion_value : number = 0;

  constructor(public auth : AuthService){
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
  }

  public ngOnInit(): void{


  }
}
