import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: Http) { }

  /**
   * Authentication service. Utilizes rxjs observables.
   * Gets an user - object. Creates a header.
   * Posts the user to the designated route. Express catches the post and runs the
   * applied mongodb - functions.
   */
  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post('http://localhost:3000/users/register', user, {headers: headers})
        .map(function(res) {
            return res.json();
        });
  }

  findUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post('http://localhost:3000/users/auth', user, {headers: headers})
        .map(function(res) {
            return res.json();
        });
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logOut() {}

}
