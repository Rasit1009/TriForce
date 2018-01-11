import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonService {

  constructor(private http: Http) { }

  public getPeople(): Observable<any>{
     return this.http
    .get('http://localhost:49873/api/users/')
    .map(r =>r.json())
    .map(e =>e.map (c=> new Person(c.i,c.isSeller,c.vorhanden, c.firstname, c.lastname, c.email, c.street)));
  }

  public getUser(token : any): Observable<any>{
    return this.http
    .get('http://localhost:49873/api/users/get/' + token)
    .map(r => r.json()); 
  }
  

  public savePeople(people: Person): Observable<any>{
    return this.http
    .post('http://localhost:49873/api/users', people);
  }
}
export class Person{
  constructor(public i, public isSeller, public vorhanden, public firstname, public lastname, public email, public street){
  }
}
