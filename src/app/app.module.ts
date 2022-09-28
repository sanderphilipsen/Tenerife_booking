import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { NgBootstrapModule } from './shared/ngbootstrap.module';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './navbar/navbar.component';
import { ModalModule } from './modals/modal.module';
import { SettingsPage } from './settings/settings.page';
import { Homepage } from './home/home.page';
import { AppartmentsContainer } from './settings/appartments/appartments.container';
import { TenantsContainer } from './settings/tenants/tenants.container';
import { OverviewModule } from './overview/overview.module';
import { AuthService } from 'src/services/auth.service';
import { SiteContainer } from './site.container';
import { CalendarYearViewComponent } from './calendar/year-view/calendar.year.view';
import { BaseStepper } from './steppers/booking/base.stepper';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Step1Tenant } from './steppers/booking/step1_tenant/step1.tenant';
import { CustomListComponent } from './custom/formscomponents/customListComponent/customListComponent';
import { Step2TDates } from './steppers/booking/step2_dates/step2.dates';
import { Step3Info } from './steppers/booking/step3_info/step3.info';
import { ConfirmationComponent } from './steppers/booking/confirmation/confirmation';
import { TestFilterPipe } from './pipes/search.pipe';



@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    NavBarComponent,
    SettingsPage,
    Homepage,
    AppartmentsContainer,
    TenantsContainer,
    SiteContainer,
    CalendarYearViewComponent,
    BaseStepper,
    Step1Tenant,
    Step2TDates,
    Step3Info,
    ConfirmationComponent,
    CustomListComponent,
    TestFilterPipe


  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NgBootstrapModule,
    NgbDropdownModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModalModule,
    ModalModule,
    OverviewModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
