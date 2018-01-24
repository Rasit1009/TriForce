import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {Observable} from 'rxjs';
import { Http } from '@angular/http/';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'ngx-qrgenerate',
  styleUrls: ['./qrgenerate.component.scss'],
  templateUrl: './qrgenerate.component.html',
})
export class QrgenerateComponent{
  elementType : 'url' | 'canvas' | 'img' = 'url';
  value : string = this.auth.id;
  text1 : any; 
  isScanned : boolean = false; 

  constructor(public auth : AuthService, public http : Http){
    Observable.interval(1000).subscribe(x=>{
      this.listen().subscribe(res=> {
      this.isScanned = res;
      if(this.isScanned){
        alert("code eingescannt");
      }
      }); 
    });
  }

  listen() : Observable<any>{
    return this.http
    .get('https://lolocoback.azurewebsites.net/api/users/getScanned/' + this.auth.id)
    .map(r=>r.json());
  }

  updateData(){
    this.text1 = document.getElementById("text1");
    this.value = this.text1.value;
  }

  setNewQr(value : string){
    this.value = value; 
  }

  
  
}
