import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate() {
        if (!this.authService.tokenExpired()) { // If token is not expired, allow the activation of the route
            return true;
        } else { // Else re-route to the login page
            this.router.navigate(['/login']);
            return false;
        }
    }
}
