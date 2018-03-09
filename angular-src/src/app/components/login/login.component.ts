import {AuthService} from './../../services/auth.service';
import {ValidateService} from './../../services/validate.service';
import {Component, OnInit} from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {

  email: String;
  password: String;

  constructor(
    private validate: ValidateService,
    private flashMessage: FlashMessagesService,
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
      this.flashMessage.show('Please fill in all fields', {
          cssClass: 'alert-danger',
          timeout: 7000
        });
      return false;
    } else {
      // Validate Email
      if (!this.validate.validateEmail(user.email)) {
        this.flashMessage.show('Please use a valid email', {
            cssClass: 'alert-danger',
            timeout: 7000
          });
        return false;
      } else {
        // Authenticate User
        this.authService
          .findUser(user)
          .subscribe(function (data) {

            console.log('response: ', data);

            if (data.success) {
              this.flashMessage.show('You are now logged in! Good to see you! :)', {
                  cssClass: 'alert-success',
                  timeout: 2000
              });
              this.router.navigate(['/profile']);
            } else {
              this.flashMessage.show('Incorrect password or email. Please try again.', {
                  cssClass: 'alert-danger',
                  timeout: 7000
              });
              this.router.navigate(['/login']);
            }
          }.bind(this)); // https://stackoverflow.com/questions/40801758/angular2-subscribe-understand-arrow-function;
      }
    }
  }
}
