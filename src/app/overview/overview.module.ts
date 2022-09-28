import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { OverviewPage } from './overview.page';
import { RevenuesComponent } from './revenuesPerAppartment/revenues.component';

@NgModule({
  imports:
  [
    CommonModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    NgChartsModule
  ],
  declarations: [
  OverviewPage,
  RevenuesComponent
  ],
exports:
  [
    OverviewPage,
    RevenuesComponent
  ]
})
export class OverviewModule { }
