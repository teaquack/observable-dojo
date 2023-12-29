import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'dojo-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
    signupForm!: FormGroup;
    
    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        // private dialogRef: MatDialogRef<SignUpComponent>
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
            this.authService.signUp(email, password);
            // this.dialogRef.close();
        }
    }

    signIn(): void {
        this.router.navigateByUrl('/auth/sign-in');
    }

    onClose(): void {
        // this.dialogRef.close();
    }
}
