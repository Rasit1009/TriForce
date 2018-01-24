import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import {Observable} from'rxjs/Rx';
import 'rxjs/add/operator/map';



@Injectable()
export class DayService {

    constructor(private http: Http) { }




public getDay(id : any): Observable<Day>{
 return this.http
       .get('https://lolocoback.azurewebsites.net/api/action/getday/' + id)
       .map(r =>r.json());
}

}


export class Day{

constructor(public monday, public tuesday, public wednesday, public thursday, public friday, public saturday){}
}
