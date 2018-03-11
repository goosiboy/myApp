import {AuthService} from './../../services/auth.service';
import {ValidateService} from './../../services/validate.service';
import {Component, OnInit} from '@angular/core';
import {FlashMessageService} from './../../services/flash-message.service';
import {Router} from '@angular/router';

@Component({selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {

  email: String;
  password: String;

  constructor(
    private validate: ValidateService,
    private flashMessage: FlashMessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    };

    // Validate Login
    if (!this.validate.validateLogin(user)) {
      this.flashMessage.fieldsError();
      return false;
    } else {
      // Validate Email
      if (!this.validate.validateEmail(user.email)) {
        this.flashMessage.emailError();
        return false;
      } else {
        // Authenticate User
        this.authService
          .findUser(user)
          .subscribe(function (data) {
            if (data.success) {
              this.handleLogin(data);
            } else {
              this.handleError();
            }
          }.bind(this)); // https://stackoverflow.com/questions/40801758/angular2-subscribe-understand-arrow-function;
      }
    }
  }

  private handleLogin(data) {
    this.flashMessage.logInSuccess();
    this.authService.storeUserData(data.token, data.user);
    this.router.navigate(['/dashboard']);
  }

  private handleError() {
    this.flashMessage.logInError();
    this.router.navigate(['/login']);
  }

}
