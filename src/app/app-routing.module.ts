import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './authentication/guards/admin';
import { AuthGuard } from './authentication/guards/auth';
import { CalendarGuard } from './authentication/guards/calendarViewer';
import { SignInComponent } from './authentication/signIn.component';
import { Homepage } from './home/home.page';
import { NoAccessComponent } from './authentication/noAcces.component';
import { OverviewPage } from './overview/overview.page';
import { SettingsPage } from './settings/settings.page';

const routes: Routes = [
  {path: 'home', component: Homepage, canActivate: [AuthGuard,CalendarGuard]},
  {path: 'sign-in', component: SignInComponent},
  {path: 'no-access', component: NoAccessComponent},
  {path: 'settings', component: SettingsPage,canActivate: [AuthGuard, AdminGuard]},
  {path: 'overview', component: OverviewPage,canActivate: [AuthGuard, AdminGuard]},
  {path: '**', redirectTo:'home', pathMatch : 'full'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
