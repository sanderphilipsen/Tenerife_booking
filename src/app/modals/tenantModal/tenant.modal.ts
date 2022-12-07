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
      FirstName : this.fb.control(this.tenant.FirstName, Validators.required),
      Name : this.fb.control(this.tenant.Name, Validators.required),
      Email : this.fb.control(this.tenant.Email, [Validators.email, Validators.required]),
      PhoneNumber : this.fb.control(this.tenant.PhoneNumber ),
      Adress : this.fb.control(this.tenant.Adress),
      AdditionallInfo : this.fb.control(this.tenant.AdditionallInfo),
      key: this.fb.control(this.tenant.key),
    });
  }
  public close() {
    this.activeModal.close();
  }

  public submitForm() {
    if (this.tenantForm.invalid)
      return;
    if (this.isNew)
      this.tenantService.Insert(this.tenantForm.getRawValue() as Tenant);
    else
       this.tenantService.Update(this.tenantForm.getRawValue() as Tenant);

  this.activeModal.close();
  }
}

