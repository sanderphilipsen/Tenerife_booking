import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{question}}</h4>
</div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close(true)">Verwijder</button>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close(false)">Annuleer</button>
    </div>
  `
})
export class YesNoModal {
  @Input() question = "";

  constructor(public activeModal: NgbActiveModal) {}
}
