import { Injectable } from '@angular/core';
import { AuthChangeEvent, AuthResponse, AuthSession, Session, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { SupabaseService } from '../shared/supabase.service';
import { LogService } from '../shared/log.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userSubject: BehaviorSubject<Session | null>;
    private isAuthenticatedSubject!: BehaviorSubject<boolean>;

    private isAuthenticated(): boolean {
        return !!this.userSubject.value;
    }

    isAuthenticated$(): Observable<boolean> {
        return this.isAuthenticatedSubject.asObservable();
    }

    getSession(): Observable<Session | null> {
        return this.userSubject.asObservable();
    }
    
    constructor(private supabaseService: SupabaseService, private logService: LogService) {
        this.userSubject = new BehaviorSubject<Session | null>(supabaseService.session);
        this.isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

        this.supabaseService.authChanges((event: AuthChangeEvent, session: Session | null) => {
            this.logService.log(event, 'darkgreen');
            if (session) {
                this.logService.log(`Session user email: ${JSON.stringify(session.user?.email)}`, 'teal');
            } else {
                this.logService.log('No session', 'teal');
            }
            // if (event === 'INITIAL_SESSION') {
            // } else if (event === 'SIGNED_IN') {
            // } else if (event === 'SIGNED_OUT') {
            // } else if (event === 'PASSWORD_RECOVERY') {
            // } else if (event === 'TOKEN_REFRESHED') {
            // } else if (event === 'USER_UPDATED') {
            // }
            this.userSubject.next(session);
            this.isAuthenticatedSubject.next(this.isAuthenticated());
        });
    }

    async signIn(email: string, password: string, options: any = null): Promise<Session | null> {
        const { data, error } = await this.supabaseService.signIn(email, password);


        if (error) {
            console.error('Sign-in error: ', error?.message)
            throw error;
        }
        return data?.session;
    }

    async signUp(email: string, password: string, redirect: any = null): Promise<Session | null> {
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
