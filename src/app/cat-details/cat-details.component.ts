import { Component, OnInit } from '@angular/core';
import { CatService } from '../cats/cat.service';
import { Subject, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'dojo-cat-details',
	templateUrl: './cat-details.component.html',
	styleUrls: ['./cat-details.component.css']
})
export class CatDetailsComponent implements OnInit {
	private errorMessageSubject = new Subject<string>();
	errorMessage$ = this.errorMessageSubject.asObservable();
	pageTitle = 'Cat Details';
	selectedCat$ = this.catService.selectedCat$;

	constructor(
		private catService: CatService,
		private route: ActivatedRoute
	) { };

	ngOnInit() {
		this.catService.selectedCat$.pipe(take(1)).subscribe(selectedCat => {
			if (!selectedCat) {
				this.route.params.subscribe(params => {
					console.log('params ', JSON.stringify(params));
					const catId = +params['id'];
					console.log('catId ', catId);
					if (!isNaN(catId)) {
						this.catService.setSelectedCat(catId);
					}
				});
			}
		});
	}
}
