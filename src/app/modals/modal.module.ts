import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from '../calendar/calendar.component';
import { AppartmentModal } from './appartmentModal/appartment.modal';
import { BookingModal } from './bookingModal/booking.modal';
import { TenantModal } from './tenantModal/tenant.modal';
import { ToastsContainer } from './toasts/toasts-container.component';
import { YesNoModal } from './yesNoModal/YesNo.modal';

@NgModule({
  imports:
  [
    CommonModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [
    YesNoModal,
    BookingModal,
    AppartmentModal,
    TenantModal,
    ToastsContainer
  ],
exports:
  [
    YesNoModal,
    BookingModal,
    ToastsContainer
  ],
  bootstrap: [CalendarComponent]
})
export class ModalModule { }
