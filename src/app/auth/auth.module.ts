import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpConfirmComponent } from './sign-up-confirm/sign-up-confirm.component';

@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent,
        SignUpConfirmComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        AuthRoutingModule,
        ReactiveFormsModule
    ]
})
export class AuthModule { }
