import { Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { PayStatusEnum } from 'src/app/enums/payStatusEnum';
import { Appartment } from 'src/app/models/appartement';
import { Booking } from 'src/app/models/booking';
import { Tenant } from 'src/app/models/tenant';
import { BookingService } from 'src/services/booking.service';
import { TenantService } from 'src/services/tenant.service';

@Component({
  selector: 'ngb-booking-modal',
  templateUrl: './booking.modal.html'
})

export class BookingModal implements OnInit {

  @Input() public appartment: Appartment | undefined;
  @Input() public isNew: boolean = true;
  @Input() public booking: Booking | null  = null ;
  @Input() public bookings: Booking[] = [];
  @Input() public isAdmin : boolean = false;

  public payStatuses : PayStatusEnum[] = [PayStatusEnum.FullyPayed, PayStatusEnum.NotPayed, PayStatusEnum.SemiPayed];
  public selectedTenant : Tenant | null  = null;
  public tenants: Tenant[] | null = null;
  public bookingIsValid: boolean = false;
  public editMode: boolean = false;
  public numberOfDays: number = 0;

  constructor(
    public activeModal: NgbActiveModal,
     private tenantService: TenantService,
     private bookingService : BookingService) {}

  ngOnInit(): void {
    console.log(this.booking?.PrePayedAmount);
    if (this.isNew) {
      this.booking = new Booking();
      this.editMode = true;
    }
    this.GetTenants();
  }

//#region Public methods
  public selectTenant(value: Tenant){
    this.selectedTenant = value;

  }

  public updateDate(value: any, isStartDate: boolean) {

    if (!this.isAdmin)
      return;

    if (this.booking) {
      if (isStartDate)
        this.booking.StartDate = new Date(value);
      else
        this.booking.EndDate = new Date(value);
    }
    this.calculatePrices();
    this.checkIfBookingIsValid()

    if (this.booking?.StartDate && this.booking?.EndDate) {
      this.numberOfDays = this.calculateDays(this.booking.StartDate as Date, this.booking.EndDate as Date) + 1;
    }
  }

  public onChange(newValue: any) {

    if (newValue.key && this.booking) {
      this.booking.TenantKey = newValue.key;
      this.booking.Name = newValue.Name;
    }
  }

  public onChangePayStatus(newValue: PayStatusEnum) {
    if (this.booking)
      this.booking.Paystatus = newValue;
    this.checkIfBookingIsValid();
  }

  public discountEdited() {
    if ( this.booking && this.booking.HireCost != null && this.booking.Discount != null) {
      var totalCost = this.booking.HireCost + (this.booking.CleaningCost ? this.booking.CleaningCost : 100);
      this.booking.TotalCost = totalCost - this.booking.Discount;
    }
  }

  public delete() {
  if (this.booking != null) {

    if(confirm("Are you sure you want delete the booking of "+ this.booking.Name)) {
      this.bookingService.Delete(this.booking);
      this.activeModal.close();
    }
  }
}

  public submitForm() {
    if (!this.booking || !this.isAdmin)
      return;

    this.booking.StartDate = this.booking.StartDate?.toString();
    this.booking.EndDate = this.booking.EndDate?.toString();
    if (!this.booking.PrePayedAmount)
      this.booking.PrePayedAmount = 0;
    if (!this.booking.AdditionalInfo)
      this.booking.AdditionalInfo = "No additional info";
    if (this.isNew)
      this.bookingService.Insert(this.booking);
    else
      this.bookingService.Update(this.booking);

      this.editMode = false;
  }

  public checkIfBookingIsValid() {
    if (this.booking)
      this.bookingIsValid = this.bookingService.IsBookingValid(this.booking, this.bookings);
  }
//#endregion Public methods

//#region Private methods

  private GetTenants() {
    this.tenantService.GetAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.tenants = data;
      this.InitAfterTenantsAreReceived();
    });
  }

  private InitAfterTenantsAreReceived() {
    if (this.booking && !this.isNew && this.tenants != null) {
      this.selectedTenant = this.tenants.filter(x=> x.key == this.booking?.TenantKey)[0];
    }
    if (this.booking && !this.isNew && this.booking.StartDate != null) {
      this.booking.StartDate = new Date(this.booking.StartDate );
    }
    if (this.booking)
      this.bookingIsValid = this.bookingService.IsBookingValid(this.booking ,this.bookings);
  }

  private calculatePrices() {
    if( this.booking != null && this.booking.StartDate != null && this.booking.EndDate != null) {
      var x = new Date(this.booking.StartDate);
      var y = new Date(this.booking.EndDate);
       var diffInDays = this.calculateDays(x,y) + 1;

      var hirecost =  diffInDays * (
        diffInDays < 14 ?
        (this.appartment?.PricePerDay ? this.appartment.PricePerDay : 50)
        : this.appartment?.PricePerMonth ? this.appartment.PricePerMonth : 50);

      this.booking.HireCost = hirecost;
      var totalCost = this.booking.HireCost + (this.booking.CleaningCost ? this.booking.CleaningCost : 100);
      this.booking.CleaningCost = this.appartment?.CleaningCost;
      this.booking.Discount = 0;
      this.booking.AppartmentKey = this.appartment?.key;
      this.booking.TotalCost = totalCost - this.booking.Discount;
    }
  }

  public calculateDays(from: Date, until: Date): number {
      var Time = until.getTime() - from.getTime();
      return Time / (1000 * 3600 * 24);
}
//#endregion Private methods

//#region Constants strings
  public readonly NEWBOOKING : string = "New booking";
  public readonly UPDATEBOOKING : string = "Update booking";
  public readonly ADDBOOKING: string = "Add booking";
  public readonly BOOKINGNOTVALID : string = "The booking is not valid!";
  public readonly BOOKING : string  = "Booking: "
//#endregion Constants strings

}

