import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LoginGreetingService {

  message: string;
  active: boolean;
  messageChange: Subject<string> = new Subject<string>();

  constructor(
    private authService: AuthService
  ) {
    this.resolveLogin();
  }

  resolveLogin() {
    let localItem;
    let userName;

    const storage = localStorage.getItem('user');

    if (storage == null) {
      this.message = " ";
      this.active = false;
      this.messageChange.next(this.message);
    } else {
      localItem = JSON.parse(localStorage.getItem('user'));
      userName = localItem.name;
      this.message = "Welcome back, " + userName + "! :)";
      this.active = true;
      this.messageChange.next(this.message);
    }
  }

}
