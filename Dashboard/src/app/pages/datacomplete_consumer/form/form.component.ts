import { Component, OnInit } from '@angular/core';
import { Person, PersonService } from '../services/person.service';

@Component({
  selector: 'ngx-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
people: Person[] = [];
  constructor(private personService: PersonService){
    
  }

  public ngOnInit(): void{
   this.personService
   .getPeople()
   .subscribe(result => this.people = result)
  }

  public deleteClick(person: Person){
    const index = this.people.indexOf(person);
    if (index>-1){
      this.people.splice(index, 1);
    }
  }

  public savePeople(){
    this.personService.savePeople(this.people).subscribe(() => alert('Gespeichert!'));
  }
  starRate = 2;
  heartRate = 4;
}
