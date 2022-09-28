import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Appartment } from 'src/app/models/appartement';
import { AppartmentService } from 'src/services/appartment.service';

@Component({
  selector: 'ngb-appartment-modal',
  templateUrl: './appartment.modal.html'
})
export class AppartmentModal implements OnInit {

  @Input() public appartment: Appartment  = new Appartment();
  @Input() public isNew : boolean = true;

  public readonly NEWAPPARTMENT : string = "New appartment";
  public readonly UPDATEAPPARTMENT : string = "Update appartment";
  public readonly ADDAPPARTMENT: string = "Add appartment";
  public readonly APPARTMENTNOTVALID : string = "The appartment is not valid!";

  public formIsValid : boolean = false;

  constructor(public activeModal: NgbActiveModal,
      private appartmentService: AppartmentService) {}

  ngOnInit(): void {
    this.CheckEverthingFilledIn();
  }

  public SubmitForm() {

    if (this.isNew)
      this.appartmentService.Insert(this.appartment);
    else
       this.appartmentService.Update(this.appartment);

  this.activeModal.close();
  }

  public CheckEverthingFilledIn() {
    this.formIsValid = false;
    if (this.appartment.Name == null || this.appartment.Name == "")
      return;
    if (this.appartment.PricePerDay == null || this.appartment.PricePerDay <= 0)
      return;
    if (this.appartment.PricePerMonth == null || this.appartment.PricePerMonth <= 0)
      return;
    if (this.appartment.CleaningCost == null || this.appartment.CleaningCost <= 0)
      return;
    this.formIsValid = true;
  }
}

