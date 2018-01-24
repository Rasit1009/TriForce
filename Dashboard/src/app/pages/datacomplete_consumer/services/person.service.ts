import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonService {

  constructor(private http: Http) { }

  public getPeople(): Observable<any>{
     return this.http
    .get('https://lolocoback.azurewebsites.net/api/users/')
    .map(r =>r.json())
    .map(e =>e.map 
      (c=> new Person(c.i,c.isSeller,c.vorhanden, c.firstname, c.lastname, c.email, c.street,c.plz,
      c.city,c.housenumber,c.businessname,c.business,c.text,c.imagepath,c.allPoints,
      c.day,c.month,c.year,c.profession,c.familystatus,c.gender, c.isScanned)));
  }

  public getExisting(code : string):Observable<boolean>{
    return this.http
    .get('https://lolocoback.azurewebsites.net/api/users/getUs/' + code)
    .map(r=>r.json());
  }

  public getUser(token : any): Observable<any>{
    return this.http
    .get('https://lolocoback.azurewebsites.net/api/users/get/' + token)
    .map(r => r.json()); 
  }

  public setScan(token : any): Observable<any>{
    return this.http
    .get('https://lolocoback.azurewebsites.net/api/users/GetScan/' + token);
  }
  

  public savePeople(people: Person): Observable<any>{
    return this.http
    .post('https://lolocoback.azurewebsites.net/api/users', people);
  }

  public getComplete(code : string):Observable<boolean>{
    return this.http
    .get('https://lolocoback.azurewebsites.net/api/users/complete/' + code)
    .map(r=>r.json());
  }

}
export class Person{
  constructor(public i, public isSeller, public vorhanden, 
    public firstname, public lastname, public email, public street,
    public plz, public city, public housenumber, public businessname, public business,
    public text, public imagepath, public allPoints,  public day, public month, public year, public profession,
    public familystatus, public gender, public isScanned){
  }
}
