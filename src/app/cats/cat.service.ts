import { Injectable } from '@angular/core';
import { Cat } from './cat';
import { tap, catchError, map, combineLatest, shareReplay } from 'rxjs';
import { ErrorService } from '../shared/error.service';
import { HandlerService } from '../handlers/handler.service';
import { HttpService } from '../shared/http.service';

@Injectable({
	providedIn: 'root'
})
export class CatService {
	cats$ = this.httpService.get<Cat[]>('cats')
		.pipe(
			tap(data => console.log('Cats: ', JSON.stringify(data))),
			map(cats =>
				cats.map(cat => ({
					...cat,
					age: this.getAge(cat.birthdate)
				} as Cat))
			),
			catchError(this.errorService.handleHttpError)
		);

	catsWithHandlers$ = combineLatest([
		this.cats$,
		this.handlerService.handlers$
	]).pipe(
		map(([cats, handlers]) =>
			cats.map(cat => ({
				...cat,
				handlers: handlers.filter(h => cat.id === h.cat_id) ?? []
			} as Cat))
		),
		shareReplay(1)
	);

	// selectedCat$ = this.http.get<Cat>(`${this.supabaseUrl}/cats?id=eq.${1}`, { headers: { apikey: this.supabaseKey } })
	//   .pipe(
	//     tap(data => console.log('Selected Cat: ', JSON.stringify(data))),
	//     catchError(this.handleError)
	//   );

	constructor(
		private httpService: HttpService,
		private handlerService: HandlerService,
		private errorService: ErrorService
	) { }

	private getAge(birthdate: Date): number {
		const today = new Date();
		const birthdateDate = new Date(birthdate);
		let age = today.getFullYear() - birthdateDate.getFullYear();
		birthdateDate.setFullYear(today.getFullYear());
		if (birthdateDate > today) {
			age--;
		}
		return age;
	}
}
