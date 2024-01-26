import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CatsComponent } from "./cats/cats.component";
import { CatDetailsComponent } from "./cat-details/cat-details.component";
import { DetailsNavbarGuard } from '../shared/details-navbar.guard';
import { HandlersComponent } from "../handlers/handlers.component";
import { CreateCatComponent } from './create-cat/create-cat.component';

/* All of the routes have AuthGuard in app-routing */
const routes: Routes = [
    { path: '', component: CatsComponent },
    { path: 'new', component: CreateCatComponent },
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CatRoutingModule { }
