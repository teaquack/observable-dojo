import { Component } from '@angular/core';
import { CatService } from './cat.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Cat } from './cat';

@Component({
	selector: 'dojo-cats',
	templateUrl: './cats.component.html',
	styleUrls: ['./cats.component.css']
})
export class CatsComponent {
	pageTitle = 'Look at all them cats!';
	cats$ = this.catService.cats$;
	private errorMessageSubject = new Subject<string>();
	errorMessage$ = this.errorMessageSubject.asObservable();

	constructor(
		private catService: CatService,
		private router: Router
	) { };

	displayCats(): string {
		return '😻😼😹🙀';
	}

	goToCatDetails(cat: Cat): void {
		// console.log('go to cat details: ', cat.id);
		this.catService.setSelectedCat(cat.id);
		this.router.navigateByUrl(`/cats/${cat.id}`);
	}
}
