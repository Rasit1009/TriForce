import { Component } from '@angular/core';
import { Person } from '../datacomplete_consumer/services/person.service';
import { AuthService } from '../../auth/auth.service';
import { FileUploader } from 'ng2-file-upload';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'ngx-datacomplete',
  styleUrls: ['./datacomplete_seller.component.scss'],
  templateUrl: './datacomplete_seller.component.html',
})



export class Datacomplete_SellerComponent {

  person : Person = this.auth.person;
  completion_value : number = 0;


  constructor(public auth : AuthService){
    this.auth.isPersonSource.subscribe(res => {
      this.person = res;
      try {
        if(this.person.businessname){
          console.log(this.person.businessname);
          this.completion_value = this.completion_value + 10;
        }
        if(this.person.firstname){
          console.log(this.person.firstname);
          this.completion_value = this.completion_value + 10;
        }
        if(this.person.lastname){
          console.log(this.person.lastname);
          this.completion_value = this.completion_value + 10;
        }
        if(this.person.street && this.person.housenumber){
          console.log(this.person.street);
          console.log(this.person.housenumber);
          this.completion_value = this.completion_value + 10;
        }
        if(this.person.city && this.person.plz){
          console.log(this.person.city);
          console.log(this.person.plz);
          this.completion_value = this.completion_value + 10;
        }
        if(this.person.business && this.person.business != "Branche..."){
          console.log(this.person.business);
          this.completion_value = this.completion_value + 10;
        }
        if(this.person.text){
          console.log(this.person.text);
          this.completion_value = this.completion_value + 10;
        }
        if(this.person.imagepath){
          console.log(this.person.imagepath);
          this.completion_value = this.completion_value + 30;
        }
        console.log(this.person.i);
      } catch (error) {
        console.log("noch kein user da "); 
      }
    });
  }

 /* Bilduploader 
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
*/
  
}

