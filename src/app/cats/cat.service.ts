import { Injectable } from '@angular/core';
import { Cat } from './cat';
import { tap, catchError, map, combineLatest, shareReplay, Observable, BehaviorSubject, Subject, merge, scan, switchMap, of, take } from 'rxjs';
import { ErrorService } from '../shared/error.service';
import { HttpService } from '../shared/http.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class CatService {
	private selectedCatSubject = new BehaviorSubject<number>(0);
	selectedCatAction$ = this.selectedCatSubject.asObservable();

	selectCat(catId: number): void {
		this.selectedCatSubject.next(catId);
	}

	cats$ = this.httpService.get<Cat[]>('cats')
		.pipe(
			// tap(data => console.log('Cats: ', JSON.stringify(data))),
			map(cats =>
				cats.map(cat => ({
					...cat,
					age: this.getAge(cat.birthdate)
				} as Cat))
			),
			catchError(this.errorService.handleHttpError)
		);

	selectedCat$ = combineLatest([
		this.cats$,
		this.selectedCatAction$
	]).pipe(
		map(([cats, selectedCatId]) =>
			cats.find(cat => cat.id === selectedCatId)
		),
		// tap(cat => console.log('selectedCat', cat)),
		shareReplay(1)
	);
	
	// selectedCat$ = this.httpService.get<Cat>(`cats?id=eq.${1}`)
	// 	.pipe(
	// 		tap(data => console.log('Selected Cat: ', JSON.stringify(data))),
	// 		catchError(this.errorService.handleHttpError)
	// 	);

	private catInsertedSubject = new Subject<Cat>();
	catInsertedAction$ = this.catInsertedSubject.asObservable();

	catWithAdd$ = merge(
		this.cats$,
		this.catInsertedAction$
	).pipe(
		scan((acc, value) =>
			(value instanceof Array) ? [...value] : [...acc, value], [] as Cat[])
	);

	constructor(
		private httpService: HttpService,
		private errorService: ErrorService,
	) {	}

	addCat(newCat?: Cat) {
		if (newCat != null) {
			this.catInsertedSubject.next(newCat);
			// add cat to the API - database
		}
	}

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
