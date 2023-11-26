import { Component, OnInit } from '@angular/core';
import { Handler } from './handler';
import { Observable, Subject } from 'rxjs';
import { HandlerService } from './handler.service';

@Component({
	selector: 'dojo-handlers',
	templateUrl: './handlers.component.html',
	styleUrls: ['./handlers.component.css']
})
export class HandlersComponent implements OnInit {
	private errorMessageSubject = new Subject<string>();
	errorMessage$ = this.errorMessageSubject.asObservable();
	pageTitle = 'Your Handlers';
	catHandlers$!: Observable<Handler[]>;

	constructor(private handlerService: HandlerService) { }

	ngOnInit(): void {
		this.catHandlers$ = this.handlerService.getCatHandlers(1);
	}
}
