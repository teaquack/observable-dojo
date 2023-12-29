import { Injectable } from '@angular/core';
import { AuthChangeEvent, AuthResponse, AuthSession, Session, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { SupabaseService } from '../shared/supabase.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userSubject: BehaviorSubject<Session | null>;

    constructor(private supabaseService: SupabaseService) {
        this.userSubject = new BehaviorSubject<Session | null>(supabaseService.session);

        this.supabaseService.authChanges((event: AuthChangeEvent, session: Session | null) => {
            this.userSubject.next(session);
        });
    }

    getSession(): Observable<Session | null> {
        return this.userSubject.asObservable();
    }

    async signIn(email: string, password: string, options: any): Promise<Session | null> {
        const { data, error } = await this.supabaseService.signIn(email, password);


        if (error) {
            console.error('Sign-in error: ', error?.message)
            throw error;
        }
        return data?.session;
    }

    async signUp(email: string, password: string, redirect: string): Promise<Session | null> {
        const authResponse: AuthResponse = await this.supabaseService.signUp(email, password, redirect);

        if (authResponse.error) {
            console.error('Sign-up error: ', authResponse.error?.message)
            throw authResponse.error;
        }
        return authResponse.data?.session;
    }

    async signOut(): Promise<void> {
        const { error } = await this.supabaseService.signOut();
        
        if (error) {
            console.log('Error logging out: ', error.message);
            throw error;
        }
    }
}
