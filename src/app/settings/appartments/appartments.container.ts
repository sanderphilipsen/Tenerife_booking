
import {Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { AppartmentModal } from 'src/app/modals/appartmentModal/appartment.modal';
import { YesNoModal } from 'src/app/modals/yesNoModal/YesNo.modal';
import { Appartment } from 'src/app/models/appartement';
import { AppartmentService } from 'src/services/appartment.service';


@Component({
  selector: 'app-appartments',
  templateUrl: './appartments.container.html',
  styleUrls: ['./appartments.container.scss']
})
export class AppartmentsContainer implements OnInit {
  public appartments: Appartment[] | null = null;
constructor(private appartmentService: AppartmentService, private modalService: NgbModal) {

}
  ngOnInit(): void {
this.getAppartments();
}

public openBookingModal(isNew: boolean, appartment: Appartment | null) {
  const modalRef = this.modalService.open(AppartmentModal);
  modalRef.componentInstance.appartment = appartment;
  modalRef.componentInstance.isNew = isNew;
  modalRef.result.then(result =>{

  },dismiss=>{
    console.log("Dismissed",dismiss)
  })
}
public addAppartment() {
  this.openBookingModal(true, new Appartment())
}

private getAppartments(): void {
  this.appartmentService.GetAll().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.appartments = data;
  });
}
};
