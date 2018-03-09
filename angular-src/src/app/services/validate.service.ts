import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  public validateRegister(user) {
    if (
      user.name == null ||
      user.name === '' ||
      user.email == null ||
      user.email === '' ||
      user.username == null ||
      user.username === '' ||
      user.password == null ||
      user.password === ''
    ) {
      return false;
    } else {
      return true;
    }
  }

  public validateLogin(user) {
    if (user.email == null || user.email === '' || user.password == null || user.password === '') {
      return false;
    } else {
      return true;
    }
  }

  public validateEmail(email) {
    // Generic regular expression
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email); // Returns true if good email
  }

}
