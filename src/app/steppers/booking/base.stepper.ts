
import {Component, Input, OnInit} from '@angular/core';
import { Booking } from 'src/app/models/booking';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Appartment } from 'src/app/models/appartement';
import { BookingService } from 'src/services/booking.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './base.stepper.html',
  styleUrls: ['./base.stepper.scss']
})
export class BaseStepper implements OnInit {

  public currentStep = 1;
  public steps = [1,2,3, 4];

  public booking! : Booking;
  public bookingForm!: FormGroup;

  @Input()
  public appartment: Appartment | undefined;

constructor(private fb: FormBuilder, private bookingService: BookingService) {}

  ngOnInit(): void {
    if (!this.booking)
      this.booking = new Booking();
    if (this.appartment) {
      this.booking.AppartmentKey = this.appartment?.key;
      this.booking.CleaningCost = this.appartment?.CleaningCost;

    }

    this.bookingForm = this.fb.group({
      tenantForm : this.fb.group({tenant: new FormControl(this.booking?.TenantKey, Validators.required)}),
      dateForm: this.fb.group(
        {from: new FormControl(this.booking?.StartDate,Validators.required),
          to: new FormControl(this.booking?.EndDate, Validators.required),
          hireCost : new FormControl(this.booking?.HireCost, Validators.required),
          cleaningCost: new FormControl(this.booking?.CleaningCost, Validators.required),
          totalCost : new FormControl(this.booking?.TotalCost, Validators.required),
          appartmentKey: new FormControl(this.booking?.AppartmentKey)
        }),
        notesForm : this.fb.group({
          privateNote : new FormControl(this.booking?.PrivateNote),
          additionalInfo : new FormControl(this.booking?.AdditionalInfo)
        })
    });
  }

  goTo(step: number) {
    this.currentStep = step;
    console.log(this.booking);
  }

  submit() {
    if (this.bookingForm.valid)
      this.bookingService.Insert(this.booking);
  }
}


