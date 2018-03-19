import { MovieProfileComponent } from './../movie-profile/movie-profile.component';
import { Router } from '@angular/router';
import { MovieDataService } from './../../services/movie-data.service';
import { MovieDisplayComponent } from './../movie-display/movie-display.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-child',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movieData;
  @Input() imageData;
  movie = {
    poster_path: null,
    width: null,
    baseURL: null,
    imageURL: null
  };

  @Output() clickedMovieChanged: EventEmitter<number> = new EventEmitter();

  constructor(
    private movieDataService: MovieDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initMovieObject();
  }

  initMovieObject() {
    this.movie = this.movieData;
    this.movie.width = this.imageData.width;
    this.movie.baseURL = this.imageData.baseURL;
    this.movie.imageURL = this.movie.baseURL + this.movie.width + this.movie.poster_path;
  }

  onClick(movie_id) {
    this.clickedMovieChanged.emit(movie_id);
  }

}
