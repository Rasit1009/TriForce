import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  modalHeader: string;
  logopicture = '../../../../assets/images/seller/7.png'; //Bild bzw. Logo URL auslesen
  descriptionSeller = 'Das Museum Ludwig ist das Museum der Stadt Köln für die Kunst des 20. und 21. Jahrhunderts und zählt heute zu den bedeutendsten Kunstmuseen Europas. Das unmittelbar südöstlich des Kölner Doms und des Hauptbahnhofs auf der Domplatte gelegene Museum beherbergt neben der größten Pop-Art-Sammlung Europas die drittgrößte Picasso-Sammlung der Welt, eine der wichtigsten Sammlungen zum deutschen Expressionismus, Schlüsselwerke der russischen Avantgarde und eine Sammlung zur Geschichte der Fotografie mit ca. 70.000 Werken. Das Museum verfügt über eine Ausstellungsfläche von rund 8.000 m².';

  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close();
  }
}
