import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import {Observable} from'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthService } from "../../auth/auth.service";


@Injectable()
export class PointService {

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

}


export class Points{

constructor(public useri, public selleri, public points){}
}