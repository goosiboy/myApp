import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MovieDataService {
  popularData: object;
  popularMoviesArray;
  topRatedMoviesArray;

  public clickedMovie: any;
  public clickedMovieChange: Subject<string> = new Subject<string>();

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

  createTopRatedList(callback) {
    this.getTopRatedData(result => {
      this.topRatedMoviesArray = result.results;
      callback(this.topRatedMoviesArray);
    });
  }

  getTopRatedData(callback) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .get('http://localhost:3000/movies/top')
        .subscribe(data =>  {
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

  movieProfileHandler(movie_id, callback) {
    const arr1 = this.popularMoviesArray.slice(0);
    const arr2 = this.topRatedMoviesArray.slice(0);
    const arr3 = arr1.concat(arr2);
    let combinedArray = this.uniq(arr3);
    const result = combinedArray.find(function (obj) {
      combinedArray = null;
      if (obj.id === movie_id) {
        callback(obj);
      }
    });
  }

  uniq(id) {
    const prims = {"boolean": {}, "number": {}, "string": {}}, objs = [];

    return id.filter(function(item) {
        const type = typeof item;
        if (type in prims) {
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        } else {
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
        }
    });
  }

  setClickedMovie(movie_id) {
    this.clickedMovie = movie_id;
    console.log("clickedMovie: ", this.clickedMovie);
    this.clickedMovieChange.next(this.clickedMovie);
    console.log(this.clickedMovieChange);
  }

  findById(movie, callback) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post('http://localhost:3000/movies/find', movie, {headers: headers})
        .subscribe(data => {
          callback(data);
        });
  }

}
