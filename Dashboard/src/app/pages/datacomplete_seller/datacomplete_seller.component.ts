import { Component } from '@angular/core';
import { Person } from '../datacomplete_consumer/services/person.service';
import { FileUploader } from 'ng2-file-upload';

// const URL = '/api/';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'ngx-datacomplete',
  styleUrls: ['./datacomplete_seller.component.scss'],
  templateUrl: './datacomplete_seller.component.html',
})



export class Datacomplete_SellerComponent {

  bildurl: string = "http://www.grafikwerk-shop.de/WebRoot/Store25/Shops/64704216/5494/30D3/9D92/A49D/4981/C0A8/2BB8/BFD7/Bierdeckel_deinlogo.jpg";
  text1: any;

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  saveUrl(){
      this.text1 = document.getElementById("linkbox");
      this.bildurl = this.text1.value;
      alert('Dein Bild wurde erfolgreich heinzugefügt!');
    
    }
}

