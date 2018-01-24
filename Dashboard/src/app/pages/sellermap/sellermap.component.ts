import { Component } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './modal/modal.component';
import { promise } from 'selenium-webdriver';
import { AuthService } from '../../auth/auth.service';
import { Person } from '../datacomplete_consumer/services/person.service';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';



@Component({
  selector: 'ngx-sellermap',
  styleUrls: ['./sellermap.component.scss'],
  templateUrl: './sellermap.component.html',
})
export class SellermapComponent implements OnInit{

  allSeller : Person[] = []; 
  isCoordSource = new BehaviorSubject<any>(null);
  _currentCoord : Observable<any> = this.isCoordSource.asObservable().first(); 



  constructor(private modalService: NgbModal, public auth : AuthService, public http : Http) {
  //  console.log("Yolo");
   }

   setNewCoord(lat : any){
     console.log("coord geändert");
    this.isCoordSource.next(lat);
   }

   getLocation(term: string):Promise<any> {
    return this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + term + 'CA&sensor=false')
         .toPromise()
         .then((response) => Promise.resolve(response.json()))
         .catch((error) => Promise.resolve(error.json()));
 }

  showLargeModal(m : marker) {
    const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
    console.log('constructortest');
    activeModal.componentInstance.sellerHeader = m.header;
    activeModal.componentInstance.sellerText = m.sellertext;
    activeModal.componentInstance.sellerLogo = m.sellerlogo;
  }

sellerName = 'Museum Ludwig';

geolocationPosition: Position;
positionlat: number = 50.916733;
positionlng: number = 6.941262;


setData(){
  if (window.navigator && window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(
        position => {
            this.geolocationPosition = position,
                //console.log(position)
                this.positionlat = position.coords.latitude;                      
                this.positionlng = position.coords.longitude;
                console.log(this.positionlat);
                console.log(this.positionlng);
  
        },
        error => {
            switch (error.code) {
                case 1:
                    console.log('Standort nicht zugelassen');
                    break;
                case 2:
                    console.log('Standort nicht gefunden');
                    break;
                case 3:
                    console.log('Timeout');
                    break;
            }
        }
    );
  }; 
}

  ngOnInit() {
    console.log("Yala");
    this.setLocation().then(() => this.setAll()); 
    }

    setLocation(){    
      var promise = new Promise((resolve, reject) => {
                 this.setData();
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      return promise;
    }

    setAll(){
      this.mylocationconverterx();
      this.mylocationconvertery();
    }

    mylocationconverterx(){
      var x = this.positionlat;
      console.log('LängengradconverterX: ' + x);
   return x;
    }

    mylocationconvertery(){
      var y = this.positionlng
      console.log('LängengradconverterY: ' + y);
   return y;
    }

  // google maps zoom level
  zoom: number = 12;
  
   //initial center position for the map
    lat: number = 50.941278;
    lng: number = 6.958281;

//  lat: number = this.positionlat;
 // lng: number = this.positionlng;
  

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
 /** mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  } */
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
    {
      
      header: "Gaffel am Dom",
      sellertext: "Besuchen Sie das eindrucksvollste Brauhaus in Köln. Mit der Renovierung und Neueröffnung unseres Brauereiausschanks im Frühjahr 2008 haben wir dem altehrwürdigen und denkmalgeschützten Deichmannhaus sein ursprüngliches Aussehen und den Kölnern sowie den Besuchern der Stadt ein Stück städtische Tradition aus der Gründerzeit zurückgegeben.",
      sellerlogo: "http://www.gaffelamdom.de/templates/images/logo.png",
      lat: 50.941911,
      lng:  6.956812,
      label: 'G',
      draggable: false,
    },
    {
      header: "Urwaldkaffee GmbH",
      sellertext: "Urwaldkaffee hat es sich zum Ziel gesetzt, herausragende Wildkaffees von indigenen Völkern zu entdecken und gemeinsam mit den Kaffeebauern bester Qualität zu liefern. Unsere Spezialitätenkaffees leben den Nachhaltigkeitsgedanken und wir würden uns freuen, wenn Sie sie zuhause, im Betrieb und bei Freunden genießen. Jeder unserer Kaffees hat eine eigene Geschichte, die ihn einzigartig macht. Diese Spezialitätenkaffees wachsen als Waldkaffee im Einklang mit der Natur unter schattigen Bäumen. CAFÉ KOGI wächst sogar wild im Wald. Die Indianer sind nicht nur Lieferanten, sondern Partner, gemeinsam wollen wir wachsen. Unser erster Kaffee, der wunderbare CAFÉ KOGI, ist ein Hochlandkaffee aus den Bergen Kolumbiens, der jeden Kaffeeliebhaber begeistern wird. CAFÉ KOGI ist der vielleicht nachhaltigste Kaffee der Welt.",
      sellerlogo: "http://www.coaching-salon.net/wp-content/uploads/2015/03/urwaldkaffee.jpg",
      lat: 50.948946,
      lng: 6.923270,
      label: 'U',
      draggable: false,
    },
    {
      header: "Käthe Kollwitz Museum Köln",
      sellertext: "Mehr als 1.000.000 Besucher seit Eröffnung, darunter auch ein hoher Prozentsatz ausländischer Besucher, bezeugen eine für eine graphische Sammlung ungewöhnlich hohe Akzeptanz. In den Nachbarländern Niederlande und Belgien ist Käthe Kollwitz ebenfalls sehr bekannt und geschätzt. Dort stehen zum Gedenken an ihren im 1. Weltkrieg gefallenen Sohn das Mahnmal (Die trauernden Eltern) auf dem deutschen Soldatenfriedhof Vladslo in Flandern, deren Kopien in der Kölner Kirchenruine Alt St. Alban als erstes Bundesehrenmal 1959 eingeweiht worden sind.",
      sellerlogo: "https://upload.wikimedia.org/wikipedia/de/thumb/3/30/K%C3%A4the-Kollwitz-Museum_K%C3%B6ln.svg/1200px-K%C3%A4the-Kollwitz-Museum_K%C3%B6ln.svg.png",
      lat: 50.936609,
      lng: 6.946691,
      label: 'T',
      draggable: false,
    },
    {
      header: "Die Fette Kuh",
      sellertext: "Bei uns kann man guten Gewissens einen Hamburger essen, weil wir nur beste, frische Zutaten verwenden. Naturbelassenes Rindfleisch aus der Region. Frische Kartoffeln. Gemüse und Salate von Vertragspartnern unseres Vertrauens. Die Brötchen werden täglich frisch, nach unserem Rezept und ohne Konservierungsstoffe, vom Meisterbäcker hergestellt. Unser Rindfleisch stammt ausschließlich von niederrheinischen Weidetieren und wird nie gefroren. Die Steaks haben Prime Beef Qualität und wurden 28 Tage Luftgereift.Das Fleisch für die Burger wird täglich im Haus gewolft. Außer Heinz-Ketchup und Löwensenf sind alle unsere Saucen & Salat-Dressings aus eigener Herstellung. Weitere Infos folgen...",
      sellerlogo: "https://pbs.twimg.com/profile_images/449538350072872960/gpH318M3_400x400.jpeg",
      lat: 50.918200,
      lng: 6.960677,
      label: 'D',
      draggable: false,
    },
    {
      header: "Since Eleven",
      sellertext: "Inspiriert durch unsere Gäste und ständige Weiterbildung werden Since Eleven – Friseure das Haar zum Leben erwecken und individuelle, unverwechselbare Frisuren verwirklichen. Präzise orientieren wir uns an den von Ihnen mitgebrachten, ganz individuellen Informationen Ihrer Haarstruktur, Kopfform, Wirbel... und Ihrer ganz speziellen Energie und Ausstrahlung! Durch unsere Weiterbildungen sind wir ständig auf dem neuesten Stand und setzen für Sie die Trends um. ",
      sellerlogo: "https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-9/198748_372159796192359_156896789_n.jpg?oh=22d216fc0eb0569578f2e1d308d1aeef&oe=5AE5ED19",
      lat: 50.918837,
      lng: 6.960443,
      label: 'E',
      draggable: false,
    },
    {
      header: "Kochhaus Köln Sülz",
      sellertext: "Weltweit einzigartig bietet das Kochhaus als begehbares Rezeptbuch ein ständig wechselndes Angebot an 18 verschiedenen Rezepten. An frei stehenden Tischen voller frischer Zutaten finden Sie alles, was Sie zu einem bestimmten Gericht brauchen - für jeweils zwei, vier oder mehr Personen. Jederzeit gibt es eine Auswahl von Vorspeisen, Salaten und Suppen. Dazu kreative Pasta-, Fisch- und Fleischgerichte. Und natürlich einige verführerische Nachspeisen.",
      sellerlogo: "https://is2-ssl.mzstatic.com/image/thumb/Purple128/v4/1d/49/f2/1d49f28b-9bb8-483f-1412-4eb539a56279/mzl.szkmgltd.png/246x0w.jpg",
      lat: 50.917036,
      lng: 6.925157,
      label: 'K',
      draggable: false,
    },
    {
      header: "Südstadtsport",
      sellertext: "Starke Marken, große Auswahl, ausgezeichnetes Preis-Leistungs-Verhältnis, Qualität und Service. Wir sind erst dann zufrieden, wenn Sie es auch sind. Individuelle Beratung und genügend Zeit für ein persönliches Gespräch sind selbstverständlich. Wenn Sie unser Sportfachgeschäft besuchen, können Sie sicher sein, von Experten mit umfassendem Know-how beraten zu werden. Als Exclusivmitglied der Sport2000 bieten wir Ihnen die wichtigsten technischen Neuentwicklungen und Modetrends. Wir leben unseren Sport mit Herz und Engagement. Wir möchten Ihnen das vermitteln, was wir selber lieben! Seit über 30 Jahren finden wir von Sportler für Sportler das Passende für Sie.",
      sellerlogo: "https://media.cylex.de/companies/1635/193/logo/logo.jpg",
      lat: 50.996911,
      lng: 6.906057,
      label: 'S',
      draggable: false,
    },
    {
      header: "Gilden im Zims",
      sellertext: "Drehen wir die Uhren um 850 Jahre zurück. Anno 1163 datiert die erste Erwähnung des Haus Nr. 77 am Heumarkt als -Minnefusshaus-. Rund 400 Jahre später, anno 1568, lässt Ratsherr Wilhelm Peter Terlaen von Lennep das Haus „Zum Sankt Peter“ mit der prächtigen Fassade neu errichten. 1920 erwirbt Johann Zims das Gebäude und eröffnet eine Gaststätte. Schnell erfreut sie sich großer Beliebtheit. Die Zäsur kommt 1943: Nächtliche Luftangriffe zerstören das Haus. Es brennt vollkommen aus, nur die Fassade hält Stand. Die Familie Zims flüchtet in den Tiefkeller – und wird verschüttet. Nach Tagen des Wartens wirft Johann Zims eine Münze in den Kellerbrunnen. Er hat nur einen Wunsch: die Rettung seiner Liebsten.",
      sellerlogo: "http://www.gilden-brauhaus.de/wp-content/uploads/sites/59/2017/07/gilden_koelsch.png",
      lat: 50.937274,
      lng: 6.960083,
      label: 'I',
      draggable: false,
    },
    {
      header: "Zeit für Brot",
      sellertext: "Mit Zeit für Brot haben wir der Tradition des Bäckerhandwerks neues Leben eingehaucht. Wir haben uns gefragt, wie eine Bäckerei Tradition und Zeitgeist so verbindet, dass sie den heutigen Bedürfnissen entspricht. Dabei herausgekommen ist Zeit für Brot. Ein Ort, an dem Brot das bekommt, was es braucht, um gut zu sein: Beste Zutaten, Ruhe und Sorgfalt. Ein Ort, an dem Sie den Bäckern bei der Arbeit zusehen können. Ein Ort, an dem Sie sich, genau wie das Brot, die Zeit nehmen können, um die Dinge zu genießen, die zum Genießen gemacht wurden. Natürlich in Bioland-Qualität.",
      sellerlogo: "http://www.zeitfuerbrot.com/wp-content/uploads/2016/12/cropped-zeit-fuer-brot-logo-512.png",
      lat: 50.946370,
      lng: 6.925387,
      label: 'Z',
      draggable: false,
    },
    {
      header: "Hans im Glück",
      sellertext: "Diese Worte spricht Hans, nachdem er auf seinem Weg Schritt für Schritt Wertvolles gegen Wertloses eingetauscht hat – seinen Goldklumpen gegen ein Pferd, das Pferd gegen eine Kuh, die Kuh gegen ein Schwein und so weiter. Am Ende steht Hans mittellos da, trotzdem empfindet er pures Glück. Täglich frische Zutaten und beste Qualität – bei HANS IM GLÜCK bekommst Du alles, was Du Dir von einem richtigen Burger schon immer gewünscht hast.",
      sellerlogo: "https://hansimglueck-burgergrill.de/wp-content/themes/hig/images/base/hans-im-glueck-burgergrill-logo.svg",
      lat: 50.931454,
      lng: 6.918631,
      label: 'H',
      draggable: false,
    },
    {
      header:"Bäckerei Merzenich am Gürzenich",
      sellertext: "Seit 100 Jahren und vier Generationen fertigen wir in traditioneller Handarbeit mit Leidenschaft und Hingabe Backwaren. Kreativität und Handwerk vereinen sich in dieser Backtradition und fließen in unsere Rezepturen. Das können Sie schmecken. Biss für Biss. Dabei setzen wir auf Qualität in allen Bereichen. Beginnend bei der Auswahl ausschließlich naturbelassener Rohstoffe, über den traditionellen Backprozess, in dem unsere Produkte, die Zeit bekommen, die sie brauchen, bis hin zur persönlichen Beratung in unseren Ladengeschäften.",
      sellerlogo: "https://www.awenko.de/wp-content/uploads/2017/04/merzenich.png",
      lat: 50.936446,
      lng: 6.957812,
      label: 'B',
      draggable: false,
    },
    {
      header: "Sausalitos",
      sellertext: "Der Kölner Ring ist als runde Partymeile legendär – und das liegt nicht zuletzt am SAUSALITOS! Wer bei leckeren Cocktails und kalifornisch-mexikanischen Speisen in gepflegtem Ambiente den Tag zur Party machen will oder die Nacht zum Tag, kommt in unserem Restaurant voll auf seine Kosten! Und das in jeder Hinsicht! Tolle Musik, köstliche Cocktails, leckeres mexikanisches Essen mit kalifornischem Einfluss, dazu viele exklusive Specials: Unser Restaurant bietet den kürzesten Weg von der Happy Hour in eine Happy Night! Party-Fans der Dom-Stadt, freut euch auf lange, aufregende Nächte in eurem SAUSALITOS Köln Hohenzollernring!",
      sellerlogo: "http://szene38.de/wp-content/uploads/2016/01/sausallitos-logo.jpg",
      lat: 50.939539,
      lng: 6.940043,
      label: 'A',
      draggable: false,
    },
    {
      header: "Cafe Riese Köln",
      sellertext: "Das Traditionshaus mit der Hausnummer 103 steht für verführerischen Genuss. Wenn Sie mit Freunden oder Ihrer Familie ein paar schöne Stunden verbringen möchten, sind Sie hier in jedem Fall an der richtigen Adresse. Oder Sie verlegen Ihre Mittagspause mit Arbeitskollegen beim Latte Macchiato in die Sonne, bevor es wieder zurück ins Büro geht. Beim Shoppen einfach mal Pause machen und sich mit einem Cappuccino stärken und dabei die gerade erstandenen Einkäufe begutachten. Oder während einer Besichtigungstour die Tapas auf Kölsch genießen, um mit neuen Kräften das nächste Geschäft oder Museum „in Angriff“ zu nehmen.",
      sellerlogo: "https://pbs.twimg.com/profile_images/468381050758909954/iMtkuF4C_400x400.jpeg",
      lat: 50.936355,
      lng: 6.950319,
      label: 'F',
      draggable: false,
    },
    {
      header: "Mueseum Ludwig",
      sellertext: "Das Museum Ludwig ist das Museum der Stadt Köln für die Kunst des 20. und 21. Jahrhunderts und zählt heute zu den bedeutendsten Kunstmuseen Europas. Das unmittelbar südöstlich des Kölner Doms und des Hauptbahnhofs auf der Domplatte gelegene Museum beherbergt neben der größten Pop-Art-Sammlung Europas die drittgrößte Picasso-Sammlung der Welt, eine der wichtigsten Sammlungen zum deutschen Expressionismus, Schlüsselwerke der russischen Avantgarde und eine Sammlung zur Geschichte der Fotografie mit ca. 70.000 Werken. Das Museum verfügt über eine Ausstellungsfläche von rund 8.000 m².",
      sellerlogo: "http://www.museum-ludwig.de/layout/img/Logo_Museum_Ludwig_Green.png",
      lat: 50.940896,
      lng: 6.960231,
      label: 'M',
      draggable: false,
    },
    {
      header: "Cadenhead's",
      sellertext: "Die 1842 in Aberdeen gegründete Firma William Cadenhead ist Schottlands ältester unabhängiger Abfüller und seit Anfang der 1970er Jahre im Besitz von J. & A. Mitchell, einem Familienbetrieb, dem auch seit jeher Springbank, Schottlands traditionellste Destille, und die wieder eröffnete Brennerei Glengyle, gehört. William Cadenhead LTD bietet vorwiegend Einzelfassabfüllungen unterschiedlichster Destillen an. Diese Abfüllungen sind immer ohne Zusatz von Farbstoffen und ohne die sogenannte Kältefiltration (chill-filtration) abgefüllt. Meist sind diese Einzelfassabfüllungen auch in der natürlichen Alkoholstärke belassen, der (cask-strength).",
      sellerlogo: "http://2.bp.blogspot.com/-jAZCUZQFSMQ/Uz5v92WPfqI/AAAAAAAAH-A/v5nzm-8ExtI/s1600/Cadenheads+logo+tasting+notes+whisky+blog+review.jpg",
      lat: 50.916644,
      lng: 6.928902,
      label: 'C',
      draggable: false,
    },
    {
      header: "Subway Sandwiches",
      sellertext: "Bis zum Jahr 1974 besaßen und betrieben die beiden Partner 16 Submarine-Sandwich-Läden in ganz Connecticut. Als sie erkannten, dass sie ihr Ziel mit den 32 Läden nicht rechtzeitig erreichen würden, begannen sie mit dem Vertrieb von Franchiselizenzen. Das war für die Marke Subway® der Auftakt zu immensem Wachstum, das bis heute anhält.",
      sellerlogo: "https://www.preparedfoods.com/ext/resources/2016/01_16/SubwayLogo_900.jpg?1452017936",
      lat: 50.940709,
      lng: 6.941514,
      label: 'W',
      draggable: false,
    },
        
  ]
}

// just an interface for type safety.
interface marker {
  header? : string; 
  sellertext? : string; 
  sellerlogo? : string; 
	lat: number;
	lng: number;
	label?: string;
  draggable: boolean;
}


