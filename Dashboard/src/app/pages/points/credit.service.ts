import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import {Observable} from'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from "../../auth/auth.service";
import { CouponSystem } from "../coupon/coupon.service";


@Injectable()
export class CreditService {

    constructor(private http: Http) { }


public sendCredit(credit : Credit): Observable<any>{
return this.http
.post('http://localhost:49873/api/credit', credit);
}

/*public getSeller(id : any): Observable<any[]>{
 return this.http
       .get('http://localhost:49873/api/coupon/getSeller/' + id)
       .map(r =>r.json())
       .map(e =>e.map 
         (c=> new Points(c.useri,c.selleri,c.points)));
}*/



}


export class Credit{

constructor(public creditid, public selleri, public useri){}
}

