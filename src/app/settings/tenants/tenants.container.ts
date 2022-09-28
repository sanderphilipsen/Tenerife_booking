
import {Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { TenantModal } from 'src/app/modals/tenantModal/tenant.modal';
import { Tenant } from 'src/app/models/tenant';
import { TenantService } from 'src/services/tenant.service';


@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.container.html',
  styleUrls: ['./tenants.container.scss']
})
export class TenantsContainer implements OnInit {
  public tenants: Tenant[] | null = null;

constructor(private tenantService: TenantService, private modalService: NgbModal) {}
  ngOnInit(): void {
    this.getTenants();
  }

  public openBookingModal(isNew: boolean, tenant: Tenant | null) {
    const modalRef = this.modalService.open(TenantModal);
    modalRef.componentInstance.tenant = tenant;
    modalRef.componentInstance.isNew = isNew;
    modalRef.result.then(result =>{
    },dismiss=>{
    })
  }
  public addTenant() {
    this.openBookingModal(true, new Tenant())
  }

  private getTenants(): void {
    this.tenantService.GetAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.tenants = data;
    });
  }
};
