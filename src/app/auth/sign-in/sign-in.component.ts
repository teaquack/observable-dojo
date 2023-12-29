import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'dojo-sign-in',
    templateUrl: './sign-in.component.html'
})
export class SignInComponent {
    email: string = '';
    password: string = '';
    signinForm!: FormGroup;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.signinForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.maxLength(50)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
        });
    }

    signIn(): void {
        this.authService.signIn(this.email, this.password, 'cats');
    }

    signUp(): void {
        this.router.navigateByUrl('/auth/sign-up');
    }
}
