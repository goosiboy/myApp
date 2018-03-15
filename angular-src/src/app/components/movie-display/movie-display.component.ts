import { MovieDataService } from './../../services/movie-data.service';
import { Component, OnInit } from '@angular/core';
import { NguCarousel, NguCarouselStore, NguCarouselService } from '@ngu/carousel';

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.css']
})
export class MovieDisplayComponent implements OnInit {

  public popularMoviesList = [];

  public image_width;
  public image_baseURL;
  private carouselToken;

  public carouselTileItems;
  public carouselTile: NguCarousel;

  imageData = {
    width: null,
    baseURL: null
  };

  constructor(
    private movieDataService: MovieDataService,
    private carousel: NguCarouselService
  ) { }

  ngOnInit() {
    this.initConfigData();
    this.initPopularMoviesList();
    this.slideShowInit();
  }

  slideShowInit() {
    this.carouselTileItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    this.carouselTile = {
      grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease'
    };
  }

  initDataFn(key: NguCarouselStore) {
    this.carouselToken = key.token;
  }

  moveToSlide() {
    this.carousel.moveToSlide(this.carouselToken, 2, false);
  }

  carouselTileLoad(evt) {

    const len = this.carouselTileItems.length;
    if (len <= 30) {
      for (let i = len; i < len + 10; i++) {
        this.carouselTileItems.push(i);
      }
    }

  }

  initConfigData() {
    this.movieDataService.getConfig(function(result) {
        this.imageData.width = result.imageData.poster_sizes[2];
        this.imageData.baseURL = result.imageData.secure_base_url;
    }.bind(this));
  }

  initPopularMoviesList() {
    this.movieDataService.createPopularList(function (res) {
      this.popularMoviesList = res;
    }.bind(this));
  }

}
