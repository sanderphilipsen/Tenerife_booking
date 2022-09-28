import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Tenant } from 'src/app/models/tenant';
import { TenantService } from 'src/services/tenant.service';

@Component({
  selector: 'ngb-appartment-modal',
  templateUrl: './tenant.modal.html'
})

export class TenantModal implements OnInit {
  @Input() public tenant: Tenant  = new Tenant();
  @Input() public isNew : boolean = true;

  public tenantForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    private tenantService: TenantService) {}

  ngOnInit(): void {
    this.tenantForm = this.fb.group({
      firstName : this.fb.control(this.tenant.FirstName, Validators.required),
      name : this.fb.control(this.tenant.Name, Validators.required),
      email : this.fb.control(this.tenant.Email, [Validators.email, Validators.required]),
      phoneNr : this.fb.control(this.tenant.PhoneNumber ),
      adress : this.fb.control(this.tenant.Adress),
      additionalInfo : this.fb.control(this.tenant.AdditionallInfo),
    });
  }

  public submitForm() {
    this.tenantForm.errors
    if (!this.tenant)
      return;
    if (this.isNew )
      this.tenantService.Insert(this.tenant);
    else
       this.tenantService.Update(this.tenant);
  this.activeModal.close();
  }
}

