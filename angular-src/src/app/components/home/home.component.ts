import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public profileVisible: boolean;
  public movieId;

  constructor(
) { }

  ngOnInit() {
    this.profileVisible = false;
  }

  activateProfile(id) {
    this.movieId = id;
    this.profileVisible = true;
  }

  inactivateProfile(event) {
    this.profileVisible = event;
  }

}
