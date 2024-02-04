import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter((val) => val !== null), // Filter out initial BehaviourSubject value
      take(1), // Ensure the Observable completes after emitting one value
      map((isAuthenticated) => {
        console.log('Found previous token, automatic login');
        if (isAuthenticated) {
          // Directly open inside area
          this.router.navigateByUrl('/tabs', { replaceUrl: true });
          return false; // Deny access to the login page
        } else {
          // Simply allow access to the login page
          return true;
        }
      })
    );
  }
}
