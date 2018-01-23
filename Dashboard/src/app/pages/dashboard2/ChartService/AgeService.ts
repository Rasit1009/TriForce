import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import {Observable} from'rxjs/Rx';
import 'rxjs/add/operator/map';



@Injectable()
export class AgeService {

    constructor(private http: Http) { }




public getAge(id : any): Observable<Age>{
 return this.http
       .get('http://localhost:49873/api/users/age/' + id)
       .map(r =>r.json());
}

}


export class Age{

constructor(public age1, public age2, public age3, public age4, public age5){}
}

