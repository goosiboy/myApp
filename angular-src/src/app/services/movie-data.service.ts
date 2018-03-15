import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class MovieDataService {
  popularData: object;
  popularMoviesArray;

  constructor(
    private http: HttpClient
  ) {}

  createPopularList(callback) {
    this.getPopularData(result => {
      this.popularMoviesArray = result.results;

      callback(this.popularMoviesArray);

    });
  }

  getPopularData(callback) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .get('http://localhost:3000/movies/popular')
        .subscribe(data => {
          callback(data);
        });
  }

  getConfig(callback) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .get('http://localhost:3000/movies/config')
        .subscribe(data => {
          callback(data);
        });
  }

}
