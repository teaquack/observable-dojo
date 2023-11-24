import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CatsComponent } from "./cats.component";
import { CatDetailsComponent } from "../cat-details/cat-details.component";
import { DetailsNavbarGuard } from '../shared/details-navbar.guard';


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
		}
	])],
	exports: [RouterModule]
})
export class CatRoutingModule { }
