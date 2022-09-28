
import {Component, Input, OnInit} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Appartment } from 'src/app/models/appartement';

@Component({
  selector: 'app-step2-tenant',
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
  templateUrl: './step2.dates.html',
  styleUrls: ['../base.stepper.scss']
})

export class Step2TDates implements OnInit {

  public form! : FormGroup;
  public from! : FormControl;
  public to! : FormControl;
  public hireCost! : FormControl;
  public cleaningCost! : FormControl;
  public totalCost!:  FormControl;

  @Input()
  public appartment: Appartment = new Appartment;

constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get("dateForm") as FormGroup;
    this.from = this.form.controls['from'] as FormControl;
    this.to = this.form.controls['to'] as FormControl;
    this.hireCost = this.form.controls['hireCost'] as FormControl;
    this.cleaningCost = this.form.controls['cleaningCost'] as FormControl;
    this.totalCost = this.form.controls['totalCost'] as FormControl;

  }

  getNumberOfDays() : number{
    if (this.to.value && this.from.value) {
      var Time = new Date(this.to.value).getTime() - new Date(this.from.value).getTime();
      return Time / (1000 * 3600 * 24);
    }
    return 0;
  }

  public calculatePrices() {
    if( this.from.valid && this.to.valid) {
       var diffInDays = this.getNumberOfDays() + 1;

      var hirecost =  diffInDays * (
        diffInDays < 14 ?
        (this.appartment?.PricePerDay ? this.appartment.PricePerDay : 50)
        : this.appartment?.PricePerMonth ? this.appartment.PricePerMonth : 50);

      this.hireCost.setValue(hirecost);
      this.cleaningCost.setValue(this.appartment.CleaningCost ?? 100)
      this.totalCost.setValue(this.hireCost.value + this.cleaningCost.value);
    }
  }

  public updatePrice() {
    this.totalCost.setValue( +this.hireCost.value + +this.cleaningCost.value);
  }
}


