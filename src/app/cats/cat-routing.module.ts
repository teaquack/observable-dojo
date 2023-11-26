import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CatsComponent } from "./cats.component";
import { CatDetailsComponent } from "../cat-details/cat-details.component";
import { DetailsNavbarGuard } from '../shared/details-navbar.guard';
import { HandlersComponent } from "../handlers/handlers.component";


@NgModule({
	imports: [RouterModule.forChild([
		{
			path: '',
			component: CatsComponent
		},
		{
			path: ':id',
			component: CatDetailsComponent,
			canActivate: [DetailsNavbarGuard]
		},
		{
			path: ':id/handlers',
			component: HandlersComponent,
			canActivate: [DetailsNavbarGuard]
		}
	])],
	exports: [RouterModule]
})
export class CatRoutingModule { }
