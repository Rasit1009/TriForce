import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import {Observable} from'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from "../../auth/auth.service";


@Injectable()
export class CouponService {

    constructor(private http: Http) { }


public sendSystem(coupon : Coupon): Observable<any>{
return this.http
.post('http://localhost:49873/api/couponsystem', coupon);
}

public getCoupon(id : any): Observable<any>{
 return this.http
       .get('http://localhost:49873/api/couponsystem/get/' + id)
       .map(r =>r.json());
}

}


export class Coupon{

constructor(public selleri, public coupontext, public coupondetail, public moneyvalue, public number){}
}

export class CouponSystem{
    constructor(public couponSystemid, public selleri, public coupontext, 
        public coupondetail, public moneyvalue, public number){}
}