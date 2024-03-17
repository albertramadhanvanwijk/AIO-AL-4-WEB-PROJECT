// Create a new file auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          // User is logged in, allow access to the route
          return true;
        } else {
          // User is not logged in, redirect to the login page
          this.router.navigate(['/auth/login']);
          return false;
        }
      })
    );
  }
}
