
import {Component,ChangeDetectionStrategy,ViewChild,TemplateRef, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView,} from 'angular-calendar';
import { Booking } from '../models/booking';
import { BookingModal } from '../modals/bookingModal/booking.modal';
import { Appartment } from '../models/appartement';
import { BookingService } from 'src/services/booking.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;
  @Input() bookings : Booking[] = [];
  @Input() appartment: Appartment | null = null;
  public randomColors  = [colors.red, colors.green, colors.orange, colors.yellow, colors.blue]
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  public bookingPopup: Booking | null = null;
  viewDate: Date = new Date();
  isAdmin: boolean = false ;
  public openBookingModal() {
    const modalRef = this.modalService.open(BookingModal, {size : 'lg'});

    modalRef.componentInstance.appartment = this.appartment;
    modalRef.componentInstance.bookings = this.bookings;
    modalRef.componentInstance.isAdmin = this.isAdmin;
    modalRef.componentInstance.isNew = true;
    modalRef.result.then(result =>{
    },dismiss=>{
    })
  }

  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;

  actions: CalendarEventAction[] = [
    {
      label: '<p class="text-light">Edit</p>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  constructor(private modalService: NgbModal,
     private bookingService: BookingService, private authService: AuthService) {}

  ngOnChanges(changes: SimpleChanges): void {
   this.events = [];
    this.addCalendarEvents();
  }

  async ngOnInit(): Promise<void> {
    this.events = [];
    this.addCalendarEvents();
    this.isAdmin = this.authService.isAdmin;
  }

  addCalendarEvents() {
    var count = 0;
    this.bookings.forEach(booking => {

      this.events.push( {
      start: booking.StartDate ?  new Date(booking.StartDate) : new Date(),
      end: booking.EndDate ?  new Date(booking.EndDate)  : new Date(),
      title: booking.Name ? booking.Name : '',
      color: this.randomColors[count],
      actions: this.actions,

      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,

      })
      if (count == 3) {
        count = 0;
      }else {
        count ++;
      }
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (events.length == 0)
      return;
    var booking = this.bookingService.getBookingFromDay(date, this.bookings);
    if (!booking || booking == undefined)
      return;
    const modalRef = this.modalService.open(BookingModal, {size: 'lg'});

    modalRef.componentInstance.appartment = this.appartment;
    modalRef.componentInstance.bookings = this.bookings;
    modalRef.componentInstance.isNew = false;
    modalRef.componentInstance.isAdmin = this.isAdmin;
    modalRef.componentInstance.booking = booking;
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modalService.open(this.modalContent, { size: 'lg' });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  public open(content: any, booking : Booking | false) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size : 'lg'}).result.then((result) => {
    }, (reason) => {
    });
  }
}

const colors: any = {
  red: {
    primary: 'red',
    secondary: '#ff160C',
  },
  green: {
    primary: 'green',
    secondary: '#D1E8FF',
  },
  orange: {
    primary: 'orange',
    secondary: '#FDF1BA',
  },
  yellow: {
    primary: 'yellow',
    secondary: '#FDF1BA',
  },
  blue: {
    primary: 'blue',
    secondary: '#FDF1BA',
  }
};
