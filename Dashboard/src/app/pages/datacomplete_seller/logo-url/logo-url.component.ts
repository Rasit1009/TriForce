import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo-url',
  templateUrl: './logo-url.component.html',
  styleUrls: ['./logo-url.component.scss']
})
export class LogoUrlComponent {

  bildurl: string = "http://www.grafikwerk-shop.de/WebRoot/Store25/Shops/64704216/5494/30D3/9D92/A49D/4981/C0A8/2BB8/BFD7/Bierdeckel_deinlogo.jpg";
  text1: any;

  saveUrl(){
    this.text1 = document.getElementById("linkbox");
    this.bildurl = this.text1.value;
    alert('Dein Bild wurde erfolgreich hinzugefügt!');
  
  }
}
