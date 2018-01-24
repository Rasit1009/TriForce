import { Component, OnInit } from "@angular/core";
import { Person } from "../../datacomplete_consumer/services/person.service";
import { AuthService } from "../../../auth/auth.service";
import { Datacomplete_SellerComponent } from "../datacomplete_seller.component";


@Component({
  selector: 'ngx-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  
  person : Person = this.auth.person;
  constructor(public auth : AuthService, public toast: Datacomplete_SellerComponent){

      //this.toast.showToast('default', 'test', 'test');

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

    /*if(ischecked1){
      this.person.gender = "weiblich"
    } else if(ischecked2){
      this.person.gender ="männlich"
    } else{
      this.person.gender="keine Angabe"
    }
    */

    //Toastimplementierung
    //this.toast.clearToasts();
   // this.toast.showToast('success', 'Daten aktualisiert und gespeichert', '');
    

  if((<HTMLInputElement>document.getElementById("firstname")).value){
    this.person.firstname = (<HTMLInputElement>document.getElementById("firstname")).value
  } else{
    this.person.firstname ="";
  };
  
  if((<HTMLInputElement>document.getElementById("lastname")).value){
    this.person.lastname = (<HTMLInputElement>document.getElementById("lastname")).value;
  }else{
    this.person.lastname = "";
  };
  
  if((<HTMLInputElement>document.getElementById("businessname")).value){
    this.person.businessname = (<HTMLInputElement>document.getElementById("businessname")).value
  }else{
    this.person.businessname ="";
  };
    ; 
  
  if((<HTMLInputElement>document.getElementById("street")).value){
      this.person.street = (<HTMLInputElement>document.getElementById("street")).value;
  }else{
      this.person.street = "";
  };
  
  if((<HTMLInputElement>document.getElementById("housenumber")).value){
    this.person.housenumber = (<HTMLInputElement>document.getElementById("housenumber")).value;
  }else{
    this.person.housenumber = "";
  };

  if((<HTMLInputElement>document.getElementById("city")).value){
    this.person.city = (<HTMLInputElement>document.getElementById("city")).value;
  }else{
    this.person.city = "";
  };

  if((<HTMLInputElement>document.getElementById("plz")).value){
    this.person.plz = (<HTMLInputElement>document.getElementById("plz")).value;
  }else{
    this.person.plz = 0;
  };

  if((<HTMLInputElement>document.getElementById("text")).value){
    this.person.text = (<HTMLInputElement>document.getElementById("text")).value
  }else{
    this.person.text ="";
  };
  
  if((<HTMLInputElement>document.getElementById("business")).value && (<HTMLInputElement>document.getElementById("business")).value != "Branche..."){
    this.person.business = (<HTMLInputElement>document.getElementById("business")).value
  }else{
    this.person.business ="";
  };
  
/*  if(this.person.imagepath = (<HTMLInputElement>document.getElementById("imagepath")).value){
    this.person.imagepath = (<HTMLInputElement>document.getElementById("imagepath")).value
  }else{
      this.person.imagepath = "";
    };
*/
  if((<HTMLInputElement>document.getElementById("firstname")).value&&
  (<HTMLInputElement>document.getElementById("lastname")).value&&(<HTMLInputElement>document.getElementById("businessname")).value&&
  (<HTMLInputElement>document.getElementById("street")).value&&(<HTMLInputElement>document.getElementById("housenumber")).value&&
  (<HTMLInputElement>document.getElementById("city")).value&&(<HTMLInputElement>document.getElementById("plz")).value&&
  (<HTMLInputElement>document.getElementById("text")).value&&(<HTMLInputElement>document.getElementById("business")).value && 
  (<HTMLInputElement>document.getElementById("business")).value != "Branche..."){
    this.toast.showToast('success', 'Erfolgreich', 'Daten erfolgreich eingegeben.')
    this.auth.setNewUserData(this.person);
    this.auth.setUser(this.person);
    this.auth.routToSetting(); 
  } else {
    this.auth.s_complete = false; 
    this.toast.showToast('error', 'Fehler', 'Bitte alle Felder ausfüllen.')
    //this.auth.setNewUserData(this.person);
    //this.auth.setUser(this.person);
  }
   

  }
  starRate = 2;
  heartRate = 4;
}
