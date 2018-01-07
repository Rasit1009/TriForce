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

  id = 0; 
  isSeller = false;
  vorhanden = false; 
  people = new Person(this.id, this.isSeller, this.vorhanden); 


  constructor(private auth : AuthService, private personService : PersonService) {

    

   }

  ngOnInit() {
  }
 

  
  weiter(){
   var e1 = <HTMLInputElement> document.getElementById('r1');
   var e2 = <HTMLInputElement> document.getElementById('r2');

   var ischecked1 = e1.checked;
   var ischecked2 = e2.checked;

   if(ischecked1){
     alert('Händler gewählt');
     this.auth.getToken(); 
     alert(this.auth.token.sub);
     this.people.i = this.auth.token.sub;
     this.people.isSeller = true; 
     alert(this.people.i + " und " + this.people.isSeller);
     this.personService.setSeller(this.people).subscribe();

   }
   else if(ischecked2){
     alert('Käufer gewählt');
     this.auth.getToken(); 
     this.people.i = this.auth.token.sub;
     this.people.isSeller = false; 
     alert(this.people.i + " und " + this.people.isSeller);
     this.personService.setSeller(this.people).subscribe();
     location.reload(); 
     
   }
   else{
     alert('läuft');
   }
   
 
    
  }

}
