import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user-model';
import { AuthService } from 'src/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class CalendarGuard implements CanActivate {
  users: UserModel[] = [];
  constructor(
    public authService: AuthService,
    public router: Router,
  ){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isCalendarViewer !== true) {
      this.router.navigate(['sign-in'])
    }
    return true;
  }
}
