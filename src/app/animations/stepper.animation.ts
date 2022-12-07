import { trigger, transition, query, style, group, animate, keyframes } from "@angular/animations";

export const StepperAnimation =
  trigger('slideInOut', [
    transition(':enter', [
      style({transform: 'translateX(-100%)'}),
      animate('400ms ease-in', style({transform: 'translateX(0%)'}))
    ]),
    transition(':leave', [
      animate('400ms ease-out', style({transform: 'translateX(-100%)'}))
    ])
  ]);

