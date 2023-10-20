import { Injectable } from '@angular/core';
import { Cat } from './cat';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private supabaseUrl = `${environment.supabaseUrl}/rest/v1`;
  private supabaseKey = environment.supabaseKey;

  cats$ = this.http.get<Cat[]>(`${this.supabaseUrl}/cats`, { headers: { apikey: this.supabaseKey } })
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

  // selectedCat$ = this.http.get<Cat>(`${this.supabaseUrl}/cats?id=eq.${1}`, { headers: { apikey: this.supabaseKey } })
  //   .pipe(
  //     tap(data => console.log('Selected Cat: ', JSON.stringify(data))),
  //     catchError(this.handleError)
  //   );

  constructor(private http: HttpClient, private errorService: ErrorService) {   }

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
