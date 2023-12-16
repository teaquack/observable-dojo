import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private baseUrl = `${environment.supabaseUrl}/rest/v1`;
    private apiKey = environment.supabaseKey;
    private options: any;

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'apikey': this.apiKey
        });
        return headers;
    }

    get<T>(endpoint: string): Observable<T> {
        const url = `${this.baseUrl}/${endpoint}`;
        const headers = this.getHeaders();

        return this.http.get<T>(url, { headers: headers });
    }

    // post<T>(endpoint: string, body: any): Observable<T> {
    //     const url = `${this.baseUrl}/${endpoint}`;
    //     const headers = this.getHeaders();

    //     return this.http.post<T>(url, body, { headers: headers });
    // }
}
