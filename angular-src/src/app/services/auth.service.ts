import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(
    private http: Http
  ) {}

  /**
   * Authentication service. Utilizes rxjs observables.
   * Gets a user - object. Creates a header.
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

  getProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http
      .get('http://localhost:3000/users/profile', {headers: headers})
        .map(function(res) {
            return res.json();
        });
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  /**
   * A simple token getter. Returns the JWT.
   */
  tokenGetter() {
    return localStorage.getItem('id_token');
  }

  /**
   * Checks if the token is expired or not. Returns true or false.
   */
  tokenExpired() {
    const helper = new JwtHelperService();
    const token = this.tokenGetter();
    const tokenExpired: boolean = helper.isTokenExpired(token);

    return tokenExpired;
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logOut(callback) {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    const storage = window.localStorage.length;
    if (this.authToken === null && this.user === null && storage === 0) {
      callback(true);
    }
  }

}
