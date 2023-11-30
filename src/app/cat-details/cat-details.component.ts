import { Component, OnInit } from '@angular/core';
import { CatService } from '../cats/cat.service';
import { Subject, switchMap, take } from 'rxjs';
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

	ngOnInit(): void {
		this.route.params.pipe(
			take(1),
			switchMap((params) => this.catService.handleCatIdSelection(params as {id: string}))
		).subscribe();
	}
}
