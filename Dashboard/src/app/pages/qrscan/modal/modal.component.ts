import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {

  modalHeader: string;
  modalContent = `Der LoloCODE wurde erfolgreich gescannt. Bitte geben Sie nun den Kaufbetrag ein, um deinem Kunden LoloCOINs gutzuschreiben: `;
  umsatz = "";

  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close();
  }
}
