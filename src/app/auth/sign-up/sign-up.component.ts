import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'dojo-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
    constructor(
        private authService: AuthService
    ) {}

    signUp() {
    }
}
