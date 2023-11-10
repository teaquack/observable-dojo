import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CatsComponent } from "./cats.component";
import { CatDetailsComponent } from "../cat-details/cat-details.component";


@NgModule({
	imports: [RouterModule.forChild([
		{
		  path: '',
		  component: CatsComponent
		},
		{
		  path: ':id',
		  component: CatDetailsComponent
		}
	])],
	exports: [RouterModule]
})
export class CatRoutingModule { }
