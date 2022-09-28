import { Component } from '@angular/core';

@Component({
  selector: 'app-no-acces',
  template: `
  <p class="text-center">{{NO_ACCES}}</p>
  `
})
export class NoAccessComponent {
  constructor() {
  }

public NO_ACCES = "No access, contact the administrator"
}
