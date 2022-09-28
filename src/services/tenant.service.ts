
import { Injectable } from '@angular/core';
import { Tenant } from 'src/app/models/tenant';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class TenantService extends DatabaseService<Tenant> {
   dbPath = '/Tenants/';
}
