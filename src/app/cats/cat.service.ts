import { Injectable } from '@angular/core';
import { Cat } from './cat';
import { tap, catchError, map, combineLatest, shareReplay, Observable, BehaviorSubject, Subject, merge, scan, switchMap, of } from 'rxjs';
import { ErrorService } from '../shared/error.service';
import { HandlerService } from '../handlers/handler.service';
import { HttpService } from '../shared/http.service';
import { ActivatedRoute, Router } from '@angular/router';

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

	// This one isn't good b/c it would pull handlers for other cats,
	// it needs to be scoped to only get handlers for the selected cat or for cats
	// catsWithHandlers$ = combineLatest([
	// 	this.cats$,
	// 	this.handlerService.handlers$
	// ]).pipe(
	// 	map(([cats, handlers]) =>
	// 		cats.map(cat => ({
	// 			...cat,
	// 			handlers: handlers.filter(h => cat.id === h.cat_id) ?? []
	// 		} as Cat))
	// 	),
	// 	shareReplay(1)
	// );

	
		// .pipe(
		// 	switchMap(selectedCatId => {
		// 		console.log('selectedCatId: ', selectedCatId);
		// 		if (selectedCatId === null) {
		// 			return this.route.params.pipe(
		// 				map(params => +params['id']),
		// 				tap(routeCatId => {
		// 					console.log('routeCatId: ', routeCatId);
		// 					if (!isNaN(routeCatId)) {
		// 						this.setSelectedCat(routeCatId);
		// 					}
		// 				})
		// 			)
		// 		} else {
		// 			return of(selectedCatId);
		// 		}
		// 	})
		// )

	private selectedCatSubject = new BehaviorSubject<number>(0);
	selectedCatAction$ = this.selectedCatSubject.asObservable();

	selectedCat$ = combineLatest([
		this.cats$,
		this.selectedCatAction$
	]).pipe(
		map(([cats, selectedCatId]) =>
			cats.find(cat => cat.id === selectedCatId)
		),
		tap(cat => console.log('selectedCat', cat)),
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
		private handlerService: HandlerService,
		private errorService: ErrorService,
		private router: Router
	) {
		const result = router.routerState.snapshot.root?.children[1]?.url[0]?.path;
		console.log('result ', result);
	}

	addCat(newCat?: Cat) {
		if (newCat != null) {
			this.catInsertedSubject.next(newCat);
			// add cat to the API - database
		}
	}

	setSelectedCat(catId: number): void {
		this.selectedCatSubject.next(catId);
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
