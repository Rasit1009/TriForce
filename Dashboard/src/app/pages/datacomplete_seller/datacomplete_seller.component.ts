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

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  
}

