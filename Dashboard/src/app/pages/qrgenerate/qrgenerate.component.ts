import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'ngx-qrgenerate',
  styleUrls: ['./qrgenerate.component.scss'],
  templateUrl: './qrgenerate.component.html',
})
export class QrgenerateComponent {
  elementType : 'url' | 'canvas' | 'img' = 'url';
  value : string = this.auth.id;
  text1 : any; 

  constructor(public auth : AuthService){}


  updateData(){
    this.text1 = document.getElementById("text1");
    this.value = this.text1.value;
  }

  
}
