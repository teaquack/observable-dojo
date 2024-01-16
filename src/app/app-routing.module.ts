import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DojoComponent } from './dojo/dojo.component';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
	imports: [RouterModule.forRoot([
		{ path: 'dojo', component: DojoComponent },
		{
			path: 'cats',
			loadChildren: () => import('./cats/cat.module').then(m => m.CatModule),
            canActivate: [AuthGuard]
		},
        {
            path: 'auth',
            loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
        },
		{ path: '', redirectTo: 'dojo', pathMatch: 'full' },
		{ path: '**', redirectTo: 'dojo', pathMatch: 'full' }
	])],
	exports: [RouterModule]
})
export class AppRoutingModule { }
