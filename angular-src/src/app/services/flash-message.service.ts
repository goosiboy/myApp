import { Injectable } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';

@Injectable()
export class FlashMessageService {

constructor(private flashMessage: FlashMessagesService) {}

  /**
   * @param str Text for the flash message.
   * @param type The alert's type. Pass either 'green' or 'red'.
   * @param time (Optional) The time in seconds. Caps at 20 seconds. Default is 4 seconds.
   */
  create(msg: string, type: string, time?: number) {

    const str: string = msg || "NULL";
    let timeOut: number = (time * 1000) || 4000;
    let cssClass: string;

    if (timeOut > 20000) {
      timeOut = 20000;
    }

    if (type === 'green') {
      cssClass = 'alert-success';
    } else if (type === 'red') {
      cssClass = 'alert-danger';
    } else {
      cssClass = 'alert-success';
      console.error('Invalid type: ' + type + '. Expected either green or red');
    }

    this.flashMessage.show(str, {
        cssClass: cssClass,
        timeout: timeOut
    });

  }

  emailError() {
    this.flashMessage.show("Please use a valid email address", {
        cssClass: 'alert-danger',
        timeout: 4000
    });
  }

  fieldsError() {
    this.flashMessage.show("Please fill in all fields", {
        cssClass: 'alert-danger',
        timeout: 4000
    });
  }

  logInError() {
    this.flashMessage.show("Incorrect password or email. Please try again", {
        cssClass: 'alert-danger',
        timeout: 4000
    });
  }

  regError() {
    this.flashMessage.show("Something went wrong. Try again at later time", {
        cssClass: 'alert-danger',
        timeout: 6000
    });
  }

  genericError() {
    this.flashMessage.show("Something went wrong", {
        cssClass: 'alert-danger',
        timeout: 4000
    });
  }

  regSuccess() {
    this.flashMessage.show('Registeration successful. You can now log in', {
        cssClass: 'alert-success',
        timeout: 4000
    });
  }

  logInSuccess() {
    this.flashMessage.show("You are now logged in", {
        cssClass: 'alert-success',
        timeout: 4000
    });
  }

  logOutSuccess() {
    this.flashMessage.show("You are now logged out", {
        cssClass: 'alert-success',
        timeout: 4000
    });
  }

}
