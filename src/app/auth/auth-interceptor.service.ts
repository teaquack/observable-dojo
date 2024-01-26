import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.getSession().pipe(
            switchMap((session) => {
                if (session) {
                    const authReq = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${session.access_token}`,
                        },
                    });
                    return next.handle(authReq);
                } else {
                    return next.handle(req);
                }
            }));
    }
}
