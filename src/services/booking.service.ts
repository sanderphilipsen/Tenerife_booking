
import { Injectable } from '@angular/core';
import { Booking } from 'src/app/models/booking';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService extends DatabaseService<Booking> {
  dbPath = '/Bookings/';

  public IsBookingValid(booking : Booking, bookings : Booking[] ) : boolean {
    var isValid = true;
    if (booking.Name == "" || booking.Name == null || booking.Name == undefined)
      isValid = false;
    if (booking.TenantKey == "" || booking.TenantKey == null || booking.TenantKey == undefined)
      isValid = false;
    if (booking.AppartmentKey == "" || booking.AppartmentKey == null || booking.AppartmentKey == undefined)
      isValid = false;
    if (booking.TotalCost == null || booking.TotalCost == undefined)
      isValid = false;
    if (booking.HireCost == null || booking.HireCost == undefined)
      isValid = false;
    if (booking.StartDate == null || booking.StartDate == undefined)
      isValid = false;
    if (booking.EndDate == null || booking.EndDate == undefined)
      isValid = false;
    if (booking.Paystatus == null)
      isValid = false;

    if (booking.StartDate != null && booking.EndDate != null) {
      if (new Date(booking.StartDate) > new Date(booking.EndDate) || new Date(booking.StartDate) == new Date(booking.EndDate)) {
          isValid = false;
        }
        console.log(isValid);

        console.log(booking);
        var conflictingbookings = bookings.filter( x =>
          (x.StartDate  && booking.StartDate && x.EndDate
            && new Date(x.StartDate) < new Date(booking.StartDate) && new Date(x.EndDate) > new Date(booking.StartDate))
            ||
            (x.StartDate != null && booking.EndDate != null && x.EndDate != null
              && new Date(x.StartDate) < new Date(booking.EndDate) && new Date(x.EndDate) > new Date(booking.EndDate))
            ||
             (x.StartDate  && booking.StartDate && x.EndDate && booking.EndDate
              && new Date(x.StartDate)> booking.StartDate && new Date(x.EndDate) < booking.EndDate ));
        if (conflictingbookings.length > 0){
          isValid = false;
        }
        console.log(conflictingbookings);
    }

    return isValid;
  }

  public getBookingFromDay(day : Date, bookings : Booking[]) : Booking{
    var booking = bookings.filter( x =>
      (x.StartDate && day  && x.EndDate
        && new Date(x.StartDate) <= day && new Date(x.EndDate) >= new Date(day))
        );
    return booking[0];
  }
}
