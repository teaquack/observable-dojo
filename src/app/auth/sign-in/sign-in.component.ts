import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'dojo-sign-in',
    templateUrl: './sign-in.component.html'
})
export class SignInComponent {
    signinForm!: FormGroup;
    hidePassword: boolean = true;
    isValid: boolean = true;

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

    async onSubmit(): Promise<void> {
        if (this.signinForm.valid) {
            const email = this.signinForm.value?.email;
            const password = this.signinForm.value?.password;
            try {
                const session = await this.authService.signIn(email, password);
                if (session !== null) {
                    this.router.navigateByUrl('/');
                }
            } catch (error) {
                this.isValid = false;
            };
        }
    }

    signUp(): void {
        this.router.navigateByUrl('/auth/sign-up');
    }

    togglePasswordVisibility(): void {
        this.hidePassword = !this.hidePassword;
    }
}
