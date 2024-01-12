import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'dojo-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
    signupForm!: FormGroup;
    hidePassword: boolean = true;
    
    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.maxLength(50)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
        });
    }
    
    onSubmit(): void {
        console.log('Form submitted :', this.signupForm.value);
        if (this.signupForm.valid) {
            const email = this.signupForm.value?.email;
            const password = this.signupForm.value?.password;
            this.authService.signUp(email, password).catch(error => {
                console.error('Sign-up error: ', error?.message);
            });
            this.router.navigateByUrl('/auth/sign-up/confirm');
        }
    }

    signIn(): void {
        this.router.navigateByUrl('/auth/sign-in');
    }
    
    togglePasswordVisibility(): void {
        this.hidePassword = !this.hidePassword;
    }
}
