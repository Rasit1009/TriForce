import { Component, AfterViewInit,OnInit } from '@angular/core';

declare var $: any;

/*as the components name implies, we build our header */

@Component({
  selector: 'na-header',
  templateUrl: '../build/header.html',
  styleUrls : ["../build/css/new-age-header.css"]
})
export class HeaderComponent  implements AfterViewInit { 
  
  ngAfterViewInit() {


    //Wiederherstellung des Smooth-Scrolling //ffried 12.01.18
    $('a.page-scroll').bind('click', function (event: any) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 50)
      }, 1250, 'easeInOutExpo');
      event.preventDefault();
    });


  }

}
