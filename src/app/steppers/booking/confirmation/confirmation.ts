
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { TenantService } from 'src/services/tenant.service';
import { Tenant } from 'src/app/models/tenant';
import { map } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Booking } from 'src/app/models/booking';

@Component({
  selector: 'app-confirmation',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('400ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('400ms ease-out', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ],
  templateUrl: './confirmation.html',
  styleUrls: ['../base.stepper.scss']
})
export class ConfirmationComponent implements OnInit {
  public form! : FormGroup;

  @Input()
  booking: Booking | null = null;

  @Output()
  confirmBooking = new EventEmitter();

constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control as FormGroup;

  }
  confirm() {

    this.confirmBooking.emit();
  }

}


