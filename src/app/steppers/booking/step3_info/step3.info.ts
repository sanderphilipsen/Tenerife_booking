
import {Component, OnInit} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormGroup, FormGroupDirective,  } from '@angular/forms';

@Component({
  selector: 'app-step3-info',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('400ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('400ms ease-out', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ],
  templateUrl: './step3.info.html',
  styleUrls: ['../base.stepper.scss']
})
export class Step3Info implements OnInit {
  public form! : FormGroup;

constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get("infoForm") as FormGroup;
  }


}


