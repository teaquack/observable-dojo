import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    return authService.isAuthenticated$().pipe(
        map(isAuthenticated => {
            if (isAuthenticated) {
                return true;
            } else {
                return false;
            }
        })
    )
};
