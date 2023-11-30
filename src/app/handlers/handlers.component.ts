import { Component, OnInit } from '@angular/core';
import { Handler } from './handler';
import { Observable, Subject, switchMap, take } from 'rxjs';
import { HandlerService } from './handler.service';
import { CatService } from '../cats/cat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'dojo-handlers',
	templateUrl: './handlers.component.html',
	styleUrls: ['./handlers.component.css']
})
export class HandlersComponent implements OnInit {
	private errorMessageSubject = new Subject<string>();
	errorMessage$ = this.errorMessageSubject.asObservable();
	pageTitle = 'Handlers';
	selectedCat$ = this.catService.selectedCat$;
	catHandlers$: Observable<Handler[]> = this.handlerService.selectedCatHandlers$;

	constructor(
		private handlerService: HandlerService,
		private catService: CatService,
		private route: ActivatedRoute
		) { }

	ngOnInit(): void {
		this.route.params.pipe(
			take(1),
			switchMap((params) => this.catService.handleCatIdSelection(params as {id: string}))
		).subscribe();
	}
}
