/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { AuthService } from './auth/auth.service';
import { Person } from './pages/datacomplete_consumer/services/person.service';
import { AfterViewInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent{


  person : Person = this.auth.person;

  constructor(private auth: AuthService) {
    try {
      this.auth.decode(localStorage.getItem('id_token')); 
    } catch (error) {
    }
    
    this.auth.isPersonSource.subscribe(res => {
      this.person = res;
      try {
        console.log(this.person.i);
      } catch (error) {
        console.log("noch kein user da "); 
      }
    });

  }
}
