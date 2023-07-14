import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatsComponent } from './cats.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CatsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CatsComponent
      }
    ])
  ]
})
export class CatModule { }
