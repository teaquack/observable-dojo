import { Component, OnInit } from '@angular/core';
import { CatService } from '../cats/cat.service';
import { Subject, combineLatest, map, take } from 'rxjs';
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

	catId$ = combineLatest([
		this.route.params,
		this.selectedCat$
	]).pipe(
		map(([params, selectedCat]) => ({ params, selectedCat })),
		take(1)
	);

	constructor(
		private catService: CatService,
		private route: ActivatedRoute
	) { };

	ngOnInit(): void {
		this.catId$.subscribe(({ params, selectedCat }) => {
			if (!selectedCat) {
				const catId = +params['id'];
				if (!isNaN(catId)) {
					this.catService.cats$.pipe(
						take(1)
					).subscribe(cats => {
						const cat = cats.find(c => c.id === catId);
						if (cat) {
							this.catService.selectCat(catId);
						}
					});
				}
			}
		});
	}
}
