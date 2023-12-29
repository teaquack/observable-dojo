import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'dojo-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent {
    constructor(
        private authService: AuthService
    ) {}

}
