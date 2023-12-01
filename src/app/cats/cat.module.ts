import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatsComponent } from './cats/cats.component';
import { MaterialModule } from '../shared/material.module';
import { CatDetailsComponent } from './cat-details/cat-details.component';
import { CatRoutingModule } from './cat-routing.module';

@NgModule({
  declarations: [
    CatsComponent,
    CatDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
	  CatRoutingModule
  ]
})
export class CatModule { }
