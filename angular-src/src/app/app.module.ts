import { LoginGreetingService } from './services/login-greeting.service';
import { SharedModule } from './modules/shared/shared.module';
import { MovieDataService } from './services/movie-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NguCarouselModule } from '@ngu/carousel';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages/module';
import { FlashMessageService } from './services/flash-message.service';
import { AuthGuardService } from './guards/auth.guard';
import { MovieDisplayComponent } from './components/movie-display/movie-display.component';
import { MovieComponent } from './components/movie/movie.component';
import { LoginGreetingComponent } from './components/login-greeting/login-greeting.component';
import { MovieProfileComponent } from './components/movie-profile/movie-profile.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'movie-profile', component: MovieProfileComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    NotFoundComponent,
    MovieDisplayComponent,
    MovieComponent,
    LoginGreetingComponent,
    MovieProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    NguCarouselModule,
    SharedModule
  ],
  providers: [
    ValidateService,
    AuthService,
    FlashMessageService,
    AuthGuardService,
    MovieDataService,
    LoginGreetingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
