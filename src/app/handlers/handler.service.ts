import { Injectable } from '@angular/core';
import { Handler } from './handler';
import { Observable, catchError, shareReplay, tap } from 'rxjs';
import { ErrorService } from '../shared/error.service';
import { HttpService } from '../shared/http.service';

@Injectable({
	providedIn: 'root'
})
export class HandlerService {

	handlers$ = this.httpService.get<Handler[]>('handlers')
		.pipe(
			tap(data => console.log('Handlers: ', JSON.stringify(data))),
			shareReplay(1),
			catchError(this.errorService.handleHttpError)
		);

	catHandlers$ = this.httpService.get<Handler[]>(`handlers/id=eq.${1}`)
		.pipe(
			tap(data => console.log('Cat Handlers: ', JSON.stringify(data))),
			shareReplay(1),
			catchError(this.errorService.handleHttpError)
		);

	constructor(private httpService: HttpService, private errorService: ErrorService) { }

	getCatHandlers(catId: number): Observable<Handler[]> {
		const endpoint = `handlers/cat_id=eq.${catId}`;
		return this.httpService.get<Handler[]>(endpoint);
	}
}
