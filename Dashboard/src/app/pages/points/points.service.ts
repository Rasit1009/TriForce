import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import {Observable} from'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class PointService {

    constructor(private http: Http) { }


public sendPoints(punkte : Punkte): Observable<any>{
return this.http
.post('http://localhost:49873/api/coupon/points', punkte);
}

}




export class Punkte{

constructor(public useri, public selleri, public points){}
}