import { Component } from '@angular/core';
import { Router } from '@angular/router';

/* this components purpose is to display our so called "section-list". this lists contains the general content of our SPA  */


@Component({ // <router-outlet></router-outlet>
  selector: 'na-app',
  template:
    `                       
            <na-section-list></na-section-list>

             `
})
export class HomeComponent {
}