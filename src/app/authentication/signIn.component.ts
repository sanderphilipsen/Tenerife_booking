import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './signIn.component.html'
})
export class SignInComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() { }
}
