import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-acces',
  template: `
  <div class="center">
  <div>
  <h2>{{NO_ACCES}}</h2>
  <button (click)="logIn()" class="btn btn-primary">Try again</button>
  </div>
  </div>
  `
})
export class NoAccessComponent {
  constructor(private router: Router) {
  }

public NO_ACCES = "No access, contact the administrator";
logIn() {
  this.router.navigate(['sign-in'])
}
}
