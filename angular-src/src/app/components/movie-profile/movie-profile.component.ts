import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import {MovieDataService} from './../../services/movie-data.service';

@Component({
  selector: 'app-movie-profile',
  templateUrl: './movie-profile.component.html',
  styleUrls: ['./movie-profile.component.css']
})
export class MovieProfileComponent implements OnInit {

  @Input() movieId;
  @Output() activated: EventEmitter<boolean> = new EventEmitter();

  public movie: object;

  constructor(
    private movieDataService: MovieDataService
  ) {}

  ngOnInit() {
    this.handleMovieData(this.movieId);
  }

initMovieObject(movieData) {
  this.movie = movieData;
}

handleMovieData(movie_id) {
  this.movieDataService.movieProfileHandler(movie_id, function(result) {
    this.initMovieObject(result);
  }.bind(this));
}

onClick() {
  this.activated.emit(false);
}

}
