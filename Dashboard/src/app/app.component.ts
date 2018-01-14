/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { AuthService } from './auth/auth.service';
import { Person } from './pages/datacomplete_consumer/services/person.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {


  person : Person = this.auth.person;

  constructor(private auth: AuthService) {
  /**  this.auth.isPersonSource.subscribe(res => {
      this.person = res;
      try {
        console.log(this.person.i);
      } catch (error) {
        console.log("noch kein user da "); 
      }
    }) */
  }

  ngOnInit(): void {
    console.log("das kommt natürlich als erstes");  
    try {
      this.auth.getUser();
      this.auth.renewToken(); 
    } catch (error) {
      console.log("error in token renewal");    
    }
  }

}
