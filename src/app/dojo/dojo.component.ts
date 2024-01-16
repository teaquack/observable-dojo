import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'dojo-dojo',
    templateUrl: './dojo.component.html'
})
export class DojoComponent {
    pageTitle = 'Welcome to the Dojo!';
    isAuthenticated: boolean = false;

    constructor(private authService: AuthService) { 
        this.authService.isAuthenticated$().subscribe(isAuthenticated => {
            this.isAuthenticated = isAuthenticated;
        });
    }
}
