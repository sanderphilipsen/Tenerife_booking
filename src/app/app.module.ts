import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbDropdownModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './navbar/navbar.component';
import { ModalModule } from './modals/modal.module';
import { SettingsPage } from './settings/settings.page';
import { Homepage } from './home/home.page';
import { AppartmentsContainer } from './settings/appartments/appartments.container';
import { TenantsContainer } from './settings/tenants/tenants.container';
import { OverviewModule } from './overview/overview.module';
import { AuthService } from 'src/services/auth.service';
import { SiteContainer } from './site.container';
import { ReactiveFormsModule } from '@angular/forms';
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
    TestFilterPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NgbDropdownModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModalModule,
    NgbModule,
    ModalModule,
    OverviewModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
