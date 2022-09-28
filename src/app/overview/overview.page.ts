import { Component, OnInit} from '@angular/core';
import { map } from 'rxjs';
import { AppartmentService } from 'src/services/appartment.service';
import { BookingService } from 'src/services/booking.service';
import { Appartment } from '../models/appartement';
import { Booking } from '../models/booking';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html'
})

export class OverviewPage implements OnInit{
  public bookings: Booking[] = [];
  public appartments: Appartment[] = [];

  public EARNINGS_TITLE = "Opbrengsten per appartement";
  constructor(private bookingService: BookingService, private appartmentService: AppartmentService)  {}

  ngOnInit(): void {
    this.GetBookings();
    this.GetAppartments();
  }

  //#region Private methods
  private GetBookings() {
    this.bookingService.GetAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.bookings = data;
    });
  }
  private GetAppartments() {
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
  //#endregion Private methods
}

