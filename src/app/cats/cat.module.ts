import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatsComponent } from './cats/cats.component';
import { MaterialModule } from '../shared/material.module';
import { CatDetailsComponent } from './cat-details/cat-details.component';
import { CatRoutingModule } from './cat-routing.module';
import { CreateCatComponent } from './create-cat/create-cat.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        CatsComponent,
        CatDetailsComponent,
        CreateCatComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        CatRoutingModule,
        ReactiveFormsModule
    ]
})
export class CatModule { }
