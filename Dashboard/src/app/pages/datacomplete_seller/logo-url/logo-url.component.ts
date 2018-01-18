import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Person } from '../../datacomplete_consumer/services/person.service';

@Component({
  selector: 'app-logo-url',
  templateUrl: './logo-url.component.html',
  styleUrls: ['./logo-url.component.scss']
})
export class LogoUrlComponent implements OnInit {

  bildurl: string = "http://www.grafikwerk-shop.de/WebRoot/Store25/Shops/64704216/5494/30D3/9D92/A49D/4981/C0A8/2BB8/BFD7/Bierdeckel_deinlogo.jpg";
  text1: any;

  saveUrl() {
    this.text1 = document.getElementById("linkbox");
    this.bildurl = this.text1.value;

  }


  person: Person = this.auth.person;

  constructor(public auth: AuthService) {

  }

  public ngOnInit(): void {
    this.auth.isPersonSource.subscribe(res => {
      this.person = res;
      try {
        console.log(this.person.i);
        console.log(this.person.imagepath);
      } catch (error) {
        console.log("noch kein user da ");
      }
    })
  }


  public savePeople() {

    if ((<HTMLInputElement>document.getElementById("imagepath")).value) {
      this.person.imagepath = (<HTMLInputElement>document.getElementById("imagepath")).value
    } else {
      this.person.imagepath = "";
    };

    this.auth.setNewUserData(this.person);
  }
}
