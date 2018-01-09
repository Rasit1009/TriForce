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
  
  isSeller : boolean = false;
  id : any; 
  isFirst : boolean = false; 
  people : Person[] = []; 
  person = new Person(null,false,false,null,null,null,null);
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
}
