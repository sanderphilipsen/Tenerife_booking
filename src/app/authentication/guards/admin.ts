import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/enums/roles';
import { AuthService } from 'src/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ){ }
  canActivate( next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      var role = this.authService.getRole;
      console.log(role);
    if(role === Roles.Admin || role.toString() == "Admin") {
      return true;
    }
    else {
      this.router.navigate(['home'])
    }
return false;
  }
}
