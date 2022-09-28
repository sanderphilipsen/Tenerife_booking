
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-site',
  template: `
  <app-navbar *ngIf="isLoggedIn"></app-navbar>
  <div class="mt-4">
    <router-outlet></router-outlet>
  </div>`
})
export class SiteContainer implements OnInit{
  public isLoggedIn = false;
  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
    this.isLoggedIn =  this.authService.isLoggedIn;
  }


}
