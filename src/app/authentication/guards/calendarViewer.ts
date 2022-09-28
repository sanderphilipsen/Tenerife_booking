import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/enums/roles';
import { AuthService } from 'src/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class CalendarGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ){ }
  canActivate( next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      var role = this.authService.getRole;
    if(role === Roles.CalendarViewer || role.toString().toLocaleLowerCase() == "calendarviewer" ||role === Roles.Admin || role.toString().toLocaleLowerCase() == "admin") {
      return true;
    }
    else {
      this.router.navigate(['home'])
    }
return false;
  }
}
