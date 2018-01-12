import { Component, AfterViewInit,OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'na-header2',
  templateUrl: '../build/seller.header.html',
  styleUrls : ["../build/css/new-age-header.css"]
})
export class Header2Component implements AfterViewInit { 
  
  ngAfterViewInit() {

    
    


    $('a.page-scroll').bind('click', function (event: any) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 50)
      }, 1250, 'easeInOutExpo');
      event.preventDefault();
    });


  }
} 