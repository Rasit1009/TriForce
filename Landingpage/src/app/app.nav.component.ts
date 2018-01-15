import { Component, AfterViewInit,OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

declare var $: any;

@Component({
  selector: 'na-nav',
  templateUrl: '../build/nav.html',
  styleUrls: ['../build/css/new-age-nav.css']
})

export class NavComponent implements AfterViewInit {
 

  
  changeDomain(){
    location.replace("http://lolocodash.azurewebsites.net/login");
  }

  ngAfterViewInit() {

    
    
    $('.navbar-collapse ul li a').click(function () {
      $('.navbar-toggle:visible').click();
    });

    $('a.page-scroll').bind('click', function (event: any) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 50)
      }, 1250, 'easeInOutExpo');
      event.preventDefault();
    });

    //Workaround Navbar, Changed offset, Navbar is now always white, even if not scrolled down //ffried
    $('#mainNav').affix({
      offset: {
        top: -1
      } 
    })
  }





}
