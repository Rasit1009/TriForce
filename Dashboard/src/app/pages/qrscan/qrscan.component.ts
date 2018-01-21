import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './modal.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'ngx-qrscan',
  styleUrls: ['./qrscan.component.scss'],
  templateUrl: './qrscan.component.html',
})
export class QrscanComponent {
  

  constructor(private modalService: NgbModal, public auth : AuthService) { }

  showLargeModal() {
    const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Large Modal';
  }
  showSmallModal(consumer_id) {
    const activeModal = this.modalService.open(ModalComponent, { size: 'sm', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Erfolgreich Gescannt';
    activeModal.componentInstance.consumerid = consumer_id; 
    activeModal.componentInstance.sellerid = this.auth.id; 
    
  }


}
