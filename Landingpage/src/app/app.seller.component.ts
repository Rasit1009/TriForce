import { Component, AfterViewInit,OnInit } from '@angular/core';


import { Router } from '@angular/router'; 

declare var $: any;



@Component({
  selector: 'na-seller',
  template: `
             <na-header2></na-header2>
             <na-seller2></na-seller2>
             <na-section-contact></na-section-contact>
             
           `
})
export class SellerComponent  implements AfterViewInit{ 
  

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