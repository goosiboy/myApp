import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from './../../services/auth.service';
import {ValidateService} from './../../services/validate.service';
import {FlashMessageService} from './../../services/flash-message.service';
import {Router} from '@angular/router';
import {LoginGreetingService} from './../../services/login-greeting.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private validate: ValidateService,
    private flashMessage: FlashMessageService,
    private authService: AuthService,
    private router: Router,
    private loginGreetingService: LoginGreetingService
  ) {}

  ngOnInit() {
    this.loginGreetingService.resolveLogin();
  }

  onLogoutClick() {
    this.authService.logOut(response => {
      if (!response) {
        this.flashMessage.genericError();
      } else {
        this.flashMessage.logOutSuccess();
        this.loginGreetingService.resolveLogin();
      }
    });
    this.router.navigate(['/']);
    return false;
  }

}
