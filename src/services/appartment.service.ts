
import { Injectable } from '@angular/core';
import { Appartment } from 'src/app/models/appartement';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AppartmentService extends DatabaseService<Appartment> {

   dbPath = '/Apartments/';
}
