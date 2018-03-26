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

  // On component init
  ngOnInit() {
    this.profileVisible = false;
  }

  // Movie profile - component becomes visible.
  activateProfile(id) {
    this.movieId = id;
    this.profileVisible = true;
  }

  // Movie profile - component becomes hidden.
  inactivateProfile(event) {
    this.profileVisible = event;
  }

}
