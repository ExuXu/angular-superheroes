import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment, } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, Observable, take, tap } from 'rxjs';

export const canActivatePubllicGuard: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) => checkAuthStatus();

export const canMatchPublicGuard: CanMatchFn = ( route: Route, segments: UrlSegment[] ) => checkAuthStatus();

const checkAuthStatus = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuth()
    .pipe(
      tap( isAuthenticated => console.log('isAuthenticated public guard', isAuthenticated)),
      tap( isAuthenticated => {
        if ( isAuthenticated ) router.navigate(['./'])
      }),
      map( isAuthenticated => !isAuthenticated )
    )
}
