import { Component, OnInit } from '@angular/core';
import { Handler } from './handler';
import { Observable, Subject, switchMap } from 'rxjs';
import { HandlerService } from './handler.service';
import { CatService } from '../cats/cat.service';
import { Cat } from '../cats/cat';

@Component({
	selector: 'dojo-handlers',
	templateUrl: './handlers.component.html',
	styleUrls: ['./handlers.component.css']
})
export class HandlersComponent {
	private errorMessageSubject = new Subject<string>();
	errorMessage$ = this.errorMessageSubject.asObservable();
	pageTitle = 'Your Handlers';
	catHandlers$: Observable<Handler[]> = this.handlerService.selectedCatHandlers$;

	constructor(
		private handlerService: HandlerService,
		private catService: CatService
		) { }
}
