import { Injectable } from '@angular/core';
import { Handler } from './handler';
import { Observable, catchError, shareReplay, switchMap, tap } from 'rxjs';
import { ErrorService } from '../shared/error.service';
import { HttpService } from '../shared/http.service';
import { CatService } from '../cats/cat.service';
import { SupabaseService } from '../shared/supabase.service';

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

	selectedCatHandlers$ = this.catService.selectedCat$.pipe(
		tap(data => {
			console.log('selected cat in handler service: ', data)
		}),
		switchMap(catId => {
		  const url = `handlers?id=eq.1`; // Adjust this based on your Supabase schema
	  
		  return this.httpService.get<Handler[]>(url).pipe(
			tap(data => console.log(`Cat Handlers for Cat ID ${catId}: `, JSON.stringify(data))),
			catchError(this.errorService.handleHttpError)
		  );
		}),
		shareReplay(1)
	  );

	catHandlers$ = this.httpService.get<Handler[]>(`handlers/id=eq.${1}`)
		.pipe(
			tap(data => console.log('Cat Handlers: ', JSON.stringify(data))),
			shareReplay(1),
			catchError(this.errorService.handleHttpError)
		);

	constructor(
		private httpService: HttpService,
		private errorService: ErrorService,
		private catService: CatService,
		private supabaseService: SupabaseService
	) { }

	getCatHandlers(catId: number): Observable<Handler[]> {
		const endpoint = `handlers/id=eq.${catId}`;
		return this.httpService.get<Handler[]>(endpoint);
	}

	async getHandlersForCat(catId: number) {
		const response = await this.supabaseService.getFromTableFor('handlers', 'catId', catId);
		return response;
	}
}
