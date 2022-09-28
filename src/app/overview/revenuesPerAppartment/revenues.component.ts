import { Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { Appartment } from 'src/app/models/appartement';
import { Booking } from '../../models/booking';

@Component({
  selector: 'app-revenues',
  templateUrl: './revenues.component.html'
})

export class RevenuesComponent implements OnInit, OnChanges{
  @Input() bookings: Booking[] = [];
  @Input() appartments: Appartment[] = [];

  public loaded: boolean = false;
  public barChartLabels: string[] = [];
  public barChartData: ChartDataset[] = [];
  constructor()  {}
  ngOnChanges(changes: SimpleChanges): void {
     }

  ngOnInit(): void {

  }
  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  Load() {
    this.initializeData();
  }

  private initializeData() {
    if (this.bookings.length == 0 || this.appartments.length == 0)
      return;
   var years = this.GetDistinctValues(this.bookings,"StartDate").sort();
    console.log(years);
    years.forEach( year => {
    console.log(year);
    var revenuesPerApp: number[] = [];
    this.appartments.forEach(app => {
      if (app.Name && this.barChartLabels.filter(x => x === app.Name).length == 0)
        this.barChartLabels.push(app.Name);

      var revenue = 0;
      var bookingsOfAppartment = this.bookings.filter(x =>
        x.AppartmentKey == app.key
        && year === this.getYearOf(x.StartDate)
      );
      bookingsOfAppartment.forEach( b => {
        if (b.TotalCost)
          revenue += b.TotalCost
      })

    revenuesPerApp.push(revenue);
    console.log(revenuesPerApp);
    });
    console.log("going to push ")
    this.barChartData.push({data: revenuesPerApp, label: year})
  });
  console.log(this.barChartData);
  this.loaded = true;
  }

  private getYearOf(input : Date| string | undefined) : number{
    if (input)
      return new Date(input).getFullYear();

      return 0;
  }

  GetDistinctValues(Source: Array<Booking>, FilterKey: string | null = null): Array<any> {
    let DistinctArray: number[] = [];
    try {
      Source.forEach(e => {
        console.log(e);
        var year = this.getYearOf(e.StartDate);
        console.log(e);
        if (e.StartDate == null)
          return;
        if (FilterKey !== null && FilterKey !== undefined && FilterKey !== "") {
          if (
            DistinctArray.filter(DE => DE  === year).length <=0
          )
            DistinctArray.push(year);
        } else {
          if (DistinctArray.indexOf((this.getYearOf(e.StartDate))) === -1) DistinctArray.push(this.getYearOf(e.StartDate));
        }
      });
    } catch (error) {
      DistinctArray = [];
    }
    return DistinctArray;
  }

}

