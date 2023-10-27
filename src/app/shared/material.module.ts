import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
	imports: [
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		// BrowserAnimationsModule,
		MatGridListModule,
		MatToolbarModule,
	],
	exports: [
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		// BrowserAnimationsModule,
		MatGridListModule,
		MatToolbarModule
	]
})
export class MaterialModule { }
