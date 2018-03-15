import { MovieDisplayComponent } from './../movie-display/movie-display.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-child',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movieData;
  @Input() imageData;
  movie = {
    title: null,
    overwiew: null,
    rating: null,
    release_date: null,
    genre_ids: null,
    poster_path: null,
    width: null,
    baseURL: null,
    imageURL: null
  };

  constructor() { }

  ngOnInit() {
    this.initMovieObject();
  }

  initMovieObject() {
    this.movie.title = this.movieData.title;
    this.movie.overwiew = this.movieData.overview;
    this.movie.rating = this.movieData.vote_average;
    this.movie.release_date = this.movieData.release_date;
    this.movie.genre_ids = this.movieData.genre_ids;
    this.movie.poster_path = this.movieData.poster_path;
    this.movie.width = this.imageData.width;
    this.movie.baseURL = this.imageData.baseURL;
    this.movie.imageURL = this.movie.baseURL + this.movie.width + this.movie.poster_path;
  }

}
