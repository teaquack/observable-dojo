import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DojoComponent } from './dojo/dojo.component';

@NgModule({
	imports: [RouterModule.forRoot([
		{ path: 'welcome', component: DojoComponent },
		{
			path: 'cats',
			loadChildren: () => import('./cats/cat.module').then(m => m.CatModule)
		},
        {
            path: 'auth',
            loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
        },
		{ path: '', redirectTo: 'welcome', pathMatch: 'full' },
		{ path: '**', redirectTo: 'welcome', pathMatch: 'full' }
	])],
	exports: [RouterModule]
})
export class AppRoutingModule { }
