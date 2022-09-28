
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-calendar-year-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.year.view.html',
  styleUrls: ['./calendar.year.view.scss']
})
export class CalendarYearViewComponent implements OnInit {

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
