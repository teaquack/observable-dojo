import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cat } from '../cats/cat';

@Injectable({
  providedIn: 'root'
})
export class SupabaseHttpService {
  private supabaseUrl = `${environment.supabaseUrl}/rest/v1`;
  private supabaseKey = environment.supabaseKey;

  cats$ = this.http.get<Cat[]>(`${this.supabaseUrl}/cats`, { headers: { apikey: this.supabaseKey } })
    .pipe(
      tap(data => console.log('Cats: ', JSON.stringify(data))),
      catchError(this.handleError)
    );

  constructor(private http: HttpClient) {   }
  
  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
