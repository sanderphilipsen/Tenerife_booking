import { Component, OnInit} from '@angular/core';
import { map } from 'rxjs';
import { AppartmentService } from 'src/services/appartment.service';
import { AuthService } from 'src/services/auth.service';
import { BookingService } from 'src/services/booking.service';
import { Roles } from '../enums/roles';
import { Appartment } from '../models/appartement';
import { Booking } from '../models/booking';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html'
})

export class Homepage implements OnInit  {
  public appartments: Appartment[] = [];
  public currentAppartment: Appartment | null = null;
  public bookings: Booking[] | null = null;
  public isAdmin = false;

constructor(private appartmentService : AppartmentService,
   private bookingService: BookingService,
   private authService: AuthService) {
}
  ngOnInit(): void {
      this.getAppartments();
      this.isAdmin  = this.authService.getRole == Roles.Admin;
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
      this.currentAppartment = data[0];
      this.LoadCalendarEvents();
    });
}

public ChangeAppartment(appartement: Appartment) {
  this.currentAppartment = appartement;
  this.LoadCalendarEvents();
}

private LoadCalendarEvents() {
this.bookingService.GetAll().snapshotChanges().pipe(
  map(changes =>
    changes.map(c =>
      ({ key: c.payload.key, ...c.payload.val() })
    )
  )
).subscribe(data => {
  this.bookings = data.filter(x => x.AppartmentKey == this.currentAppartment?.key);
});
}
}
