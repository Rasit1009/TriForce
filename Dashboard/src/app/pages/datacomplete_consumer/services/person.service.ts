import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonService {

  constructor(private http: Http) { }

  public getPeople(): Observable<Person[]>{
     return this.http
    .get('http://localhost:49873/api/users/')
    .map(r =>r.json())
    .map(e =>e.map (c=> new Person(c.i,c.isSeller,c.vorhanden)));
    
  }
  

  public savePeople(people: Person[]): Observable<any>{
    return this.http
    .post('http://localhost:55372/api/people', people);
  }

  public setSeller(people : Person): Observable<any>{
    return this.http
    .post('http://localhost:49873/api/users', people);
  }

  
}
export class Person{
  constructor(public i, public isSeller, public vorhanden){
  }
}
