import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
	imports: [
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatGridListModule,
		MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule
	],
	exports: [
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatGridListModule,
		MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule
	]
})
export class MaterialModule { }
