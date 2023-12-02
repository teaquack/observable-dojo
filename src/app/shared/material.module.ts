import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
	imports: [
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		// BrowserAnimationsModule,
		MatGridListModule,
		MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
	],
	exports: [
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		// BrowserAnimationsModule,
		MatGridListModule,
		MatToolbarModule,
        MatFormFieldModule
	]
})
export class MaterialModule { }
