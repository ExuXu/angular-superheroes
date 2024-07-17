import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment, } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

export const canActivateAuthGuard: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) => checkAuthStatus();

export const canMatchAuthGuard: CanMatchFn = ( route: Route, segments: UrlSegment[] ) => checkAuthStatus();

const checkAuthStatus = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuth()
    .pipe(
      tap( isAuthenticated => console.log('isAuthenticated', isAuthenticated)),
      tap( isAuthenticated => {
        if ( !isAuthenticated ) router.navigate(['./auth/login'])
      })
    )
}


