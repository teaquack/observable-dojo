import { Injectable } from '@angular/core';
import { Cat } from './cat';
import { tap, catchError, map, combineLatest, shareReplay, Observable, BehaviorSubject, Subject, merge, scan, switchMap, of, take, from } from 'rxjs';
import { ErrorService } from '../shared/error.service';
import { HttpService } from '../shared/http.service';
import { SupabaseService } from '../shared/supabase.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class CatService {
	private selectedCatSubject = new BehaviorSubject<number>(0);
	selectedCatAction$ = this.selectedCatSubject.asObservable();

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
		
	selectCat(catId: number): void {
		this.selectedCatSubject.next(catId);
	}

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

	private catInsertedSubject = new Subject<Cat>();
	catInsertedAction$ = this.catInsertedSubject.asObservable();

	catsWithAdd$ = merge(
		this.cats$,
		this.catInsertedAction$
	).pipe(
		scan((acc, value) =>
			(value instanceof Array) ? [...value] : [...acc, value], [] as Cat[])
	);

	constructor(
		private httpService: HttpService,
        private supabaseService: SupabaseService,
		private errorService: ErrorService,
        private authService: AuthService
	) { }

	handleCatSelection(catId: number): Observable<void | null> {
		if (!isNaN(catId)) {
			return this.cats$.pipe(
				take(1),
				map((cats) => cats.find((cat) => cat.id === catId)),
				tap((cat) => {
					if (cat) {
						this.selectCat(catId);
					}
				}),
				map(() => null)
			);
		} else {
			return of(null);
		}
	}

	addCat(newCat: Cat): Observable<void> {
        return this.authService.getSession().pipe(
            take(1),
            switchMap(session => {
                if (session) {
                    newCat.user_id = session.user.id;
                    this.catInsertedSubject.next(newCat);
                    return from(this.supabaseService.insertToTable('cats', newCat))
                    .pipe(map(() => {}));
                } else {
                    throw new Error('No user session found');
                }
            })
        );
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
