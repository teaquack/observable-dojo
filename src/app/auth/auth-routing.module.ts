import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'signin',
            component: SignInComponent
        },
        {
            path: 'signup',
            component: SignUpComponent
        }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
