/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CallbackComponent } from './pages/callback/callback.component';
import { AuthService } from './auth/auth.service';

// Import the library
import { NgxZxingModule } from 'ngx-zxing';
// Needed as well
import { FormsModule } from "@angular/forms";
import { PersonService, Person } from './pages/datacomplete_consumer/services/person.service';
import { LoginComponent } from './pages/login/login.component';
import { PointService } from './pages/points/points.service';
import { CouponService } from './pages/coupon/coupon.service';



@NgModule({
  declarations: [AppComponent,CallbackComponent,LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },AuthService, PersonService, PointService, CouponService
  ],
})
export class AppModule {
}
