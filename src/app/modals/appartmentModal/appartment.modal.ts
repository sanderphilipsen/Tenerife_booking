import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public appartmentForm! : FormGroup;

  public readonly NEWAPPARTMENT : string = "New appartment";
  public readonly UPDATEAPPARTMENT : string = "Update appartment";
  public readonly ADDAPPARTMENT: string = "Add appartment";
  public readonly APPARTMENTNOTVALID : string = "The appartment is not valid!";

  constructor(public activeModal: NgbActiveModal,
      private appartmentService: AppartmentService, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.appartmentForm = this.fb.group({
    Name : this.fb.control(this.appartment.Name, Validators.required),
    PricePerDay: this.fb.control(this.appartment.PricePerDay, [Validators.required, Validators.min(0)]),
    PricePerMonth: this.fb.control(this.appartment.PricePerMonth, [Validators.required, Validators.min(0)]),
    CleaningCost: this.fb.control(this.appartment.CleaningCost, [Validators.required, Validators.min(0)]),
    Description: this.fb.control(this.appartment.Description),
    key: this.fb.control(this.appartment.key),
    });
  }
  public close() {
    this.activeModal.close();
  }

  public SubmitForm() {
    if (this.isNew)
      this.appartmentService.Insert(this.appartmentForm.getRawValue() as Appartment);
    else
       this.appartmentService.Update(this.appartmentForm.getRawValue() as Appartment);

  this.activeModal.close();
  }
}

