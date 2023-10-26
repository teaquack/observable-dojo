import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatsComponent } from './cats.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { CatDetailsComponent } from '../cat-details/cat-details.component';

@NgModule({
  declarations: [
    CatsComponent,
    CatDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      {
        path: '',
        component: CatsComponent
      }
    ])
  ]
})
export class CatModule { }
