import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessageService } from './../../services/flash-message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  // We need to bring services into the component by initializing them in a constructor
  constructor(
    private validate: ValidateService,
    private flashMessage: FlashMessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // Require all fields
    if (!this.validate.validateRegister(user)) {
      this.flashMessage.fieldsError();
      return false;
    }

    // Validate Email
    if (!this.validate.validateEmail(user.email)) {
      this.flashMessage.emailError();
      return false;
    }

    // Register user
    this.authService
      .registerUser(user)
      .subscribe(function(data) {
      if (data.success) {
        this.flashMessage.regSuccess();
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.regError();
        this.router.navigate(['/register']);
      }
    }.bind(this)); // https://stackoverflow.com/questions/40801758/angular2-subscribe-understand-arrow-function
  }

}
