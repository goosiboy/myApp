import { Component, OnInit, Input } from '@angular/core';
import { LoginGreetingService } from './../../services/login-greeting.service';

@Component({
  selector: 'app-login-greeting',
  templateUrl: './login-greeting.component.html',
  styleUrls: ['./login-greeting.component.css']
})
export class LoginGreetingComponent implements OnInit {

  public message: string;
  public subscription: any;
  public active: boolean = this.loginGreeting.active;

  constructor(private loginGreeting: LoginGreetingService) {
    this.message = this.loginGreeting.message;
    this.subscription = this.loginGreeting.messageChange.subscribe((value) => {
      this.message = value;
    });
  }

  ngOnInit() {
  }

}
