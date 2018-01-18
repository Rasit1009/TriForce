import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { JwtHelper } from 'angular2-jwt';
import {Http} from '@angular/http';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/observable/fromEvent';
import { Person, PersonService } from '../pages/datacomplete_consumer/services/person.service';
import { PagesComponent } from '../pages/pages.component';
import {Observable, BehaviorSubject} from'rxjs/Rx';
import { Points } from '../pages/points/points.service';
import { Coupon } from '../pages/coupon/coupon.service';

@Injectable()
export class AuthService {

  
constructor(private http:Http, public router : Router, public personService : PersonService) { } 
id : string; 
jwtHelper: JwtHelper = new JwtHelper();
vorhanden : boolean = false;
email : string; 
token : any;
person : Person;
people : Person[] = [];
sellerList : Person[] = [];
isSeller : boolean; 
isPersonSource = new BehaviorSubject<Person>(null);
_currentUser : Observable<Person> = this.isPersonSource.asObservable().first(); 


  auth0 = new auth0.WebAuth({
    clientID: 'u9ppezA7kI29KclGl7qlailQbwnwqu30',
    domain: 'lolocode.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://lolocode.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:8000/callback',     
    scope: 'openid email'
  });

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  public setSession(authResult): void {
    console.log(authResult);
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.decode(authResult.idToken);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    location.replace("http://localhost:8000/login");
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public decode(authResult: any) {
    var token = this.jwtHelper.decodeToken(authResult);
    this.id = token.sub; 
    this.email = token.email;
    this.getMyUsers(); 
  }

  public getMyUsers(){
    console.log("erstmal die id " + this.id);
    console.log("anschließend die mail " + this.email ); 
    let first = this.personService.getPeople(); 
    let second = this.personService.getUser(this.id);
    Observable.forkJoin([first,second]).subscribe(results => {
      this.people = results[0];
      console.log(this.people);
      this.person = results[1]; 
      console.log(this.person);
      if(this.people.find(x => x.i === this.person.i)){
        console.log("user bereits vorhanden");
      } else {
      this.addUser(this.person);
      };
      this.setUser(this.person);
      
    });
  }

  setUser(person: Person) {
    this.isPersonSource.next(person);
  }

  setNewUserData(person : Person){
    this.person = person; 
    console.log(this.person);
    var index = this.people.findIndex(x => x.i === this.person.i)
    this.people[index] = this.person; 
    console.log(this.people[index]);
    this.personService.savePeople(this.person).subscribe(() =>{
    });
  }

  getUser() {
      return this._currentUser;  
  }

  getSeller(seller : any[]){
    var index; 
    for(var i = 0; i<seller.length; i++){
    index = this.people.findIndex(x=>x.i === seller[i].selleri);
    seller[i].selleri = this.people[index].i; 
    };
    return seller; 
  }

  addUser(person : Person){
    person = 
    new Person(this.person.i,this.person.isSeller,this.person.vorhanden,this.person.firstname,
      this.person.lastname,this.person.email,this.person.street,this.person.plz,
      this.person.city,this.person.housenumber,this.person.businessname,
      this.person.business,this.person.text,this.person.imagepath,this.person.day,
      this.person.month,this.person.year,this.person.profession,this.person.familystatus,this.person.gender);
    this.people.push(person);
  }

  refreshSubscription: any;

  // ...
  public scheduleRenewal() {
     if(!this.isAuthenticated()) return;
     this.unscheduleRenewal();

     const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

     const source = Observable.of(expiresAt).flatMap(
        expiresAt => {

        const now = Date.now();

        // Use the delay in a timer to
        // run the refresh at the proper time
        return Observable.timer(Math.max(1, expiresAt - now));
    });

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => {
       this.renewToken();
       this.scheduleRenewal();
     });
  }

  public unscheduleRenewal() {
     if(!this.refreshSubscription) return;
     this.refreshSubscription.unsubscribe();
  }

  public renewToken() {
    
      this.auth0.checkSession({}, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          try {
            this.setSession(result);
          } catch (error) {

          }
        }
      });
  }
  
}
