
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-site',
  template: `
  <app-navbar *ngIf="isAdmin"></app-navbar>
  <div class="mt-4">
    <router-outlet ></router-outlet>
  </div>`
})
export class SiteContainer implements OnInit{
  public isAdmin = false;
  constructor(private authService: AuthService) {
  }
   ngOnInit() {
    this.isAdmin = this.authService.isAdmin ;
  }
}
