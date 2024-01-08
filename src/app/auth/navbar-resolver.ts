import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

export const NavbarResolver: ResolveFn<boolean> = 
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const url: string = state.url;
        const isAuthRoute: boolean = url.includes('auth');
        console.log('resolving auth navbar with url: ', url);
        return isAuthRoute;
    };
