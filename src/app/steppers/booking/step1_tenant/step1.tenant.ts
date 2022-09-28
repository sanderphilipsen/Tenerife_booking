
import {Component, Input, OnInit} from '@angular/core';
import { TenantService } from 'src/services/tenant.service';
import { Tenant } from 'src/app/models/tenant';
import { map } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Booking } from 'src/app/models/booking';

@Component({
  selector: 'app-step1-tenant',
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
  templateUrl: './step1.tenant.html',
  styleUrls: ['../base.stepper.scss']
})
export class Step1Tenant implements OnInit {
  public tenants?: Tenant[];
  public selectedTenant : Tenant | null  = null;
  @Input()
  booking: Booking | null = null;

  public form! : FormGroup;

  constructor(private tenantService: TenantService, private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.getTenants();
    this.form = this.rootFormGroup.control.get("tenantForm") as FormGroup;
    console.log(this.form)
  }

  updateTenant(tenant: Tenant) {
    this.selectedTenant = tenant;
  }

  private getTenants(): void {
    this.tenantService.GetAll().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.tenants = data;
    });
  }

}


