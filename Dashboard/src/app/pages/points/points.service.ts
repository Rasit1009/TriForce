import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import {Observable} from'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from "../../auth/auth.service";
import { CouponSystem } from "../coupon/coupon.service";


@Injectable()
export class PointService {
couponDefault : CouponSystem[] = []; 
    constructor(private http: Http) { }


public sendPoints(punkte : Points): Observable<any>{
return this.http
.post('http://localhost:49873/api/coupon/points', punkte);
}

public getSeller(id : any): Observable<any[]>{
 return this.http
       .get('http://localhost:49873/api/coupon/getSeller/' + id)
       .map(r =>r.json())
       .map(e =>e.map 
         (c=> new Points(c.useri,c.selleri,c.points)));
}

public getSystem(seller : Points[]): Observable<CouponSystem[]>{
    if(seller){
    return this.http
    .post('http://localhost:49873/api/coupon/getSystem/', seller)
    .map(r =>r.json())
    .map(e =>e.map 
      (c=> new CouponSystem(c.CouponSystemid,c.selleri,c.coupontext,c.coupondetail,c.moneyvalue,c.number)));
    } else { 
    }
}

}


export class Points{

constructor(public useri, public selleri, public points){}
}