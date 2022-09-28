import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { auditTrail } from '@angular/fire/compat/database';
import { AuthService } from 'src/services/auth.service';
import { Roles } from '../enums/roles';
import { Appartment } from '../models/appartement';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() appartments : Appartment[] = [];
  @Output() appartmentEvent = new EventEmitter<Appartment>();
  @Input()  selectedAppartment : Appartment | null = null;
  constructor() {

  }
  ngOnInit(): void {
    //this.role = this.authService.getRole;
  }

  ChangeAppartment(appartment : Appartment) {
    this.selectedAppartment = appartment;
    this.appartmentEvent.emit(appartment);
  }
}
