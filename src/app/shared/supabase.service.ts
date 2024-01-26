import { Injectable } from '@angular/core'
import {
    AuthChangeEvent,
    AuthSession,
    createClient,
    Session,
    SignUpWithPasswordCredentials,
    SupabaseClient,
    User,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

export interface Profile {
    id?: string
    username: string
    website: string
    avatar_url: string
}

@Injectable({
    providedIn: 'root',
})
export class SupabaseService {
    private supabase: SupabaseClient;
    _session: AuthSession | null = null;

    constructor() {
        this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }

    get session() {
        this.supabase.auth.getSession().then(({ data }) => {
            this._session = data.session
        })
        return this._session;
    }

    authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
        return this.supabase.auth.onAuthStateChange(callback);
    }

    async signUp(email: string, password: string, redirect: any) {
        const signUpRequest = <SignUpWithPasswordCredentials> {
            email: email,
            password: password
        };
        if (redirect) {
            signUpRequest.options = {
                emailRedirectTo: redirect
            }
        }
        return await this.supabase.auth.signUp(signUpRequest);
    }

    async signIn(email: string, password: string) {
        return await this.supabase.auth.signInWithPassword({ email, password });
    }

    async signOut() {
        return await this.supabase.auth.signOut();
    }

    async getProfile(user: User) {
        return this.supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single();
    }

    async insertToTable(table_name: string, data: any) {
        return await this.supabase.from(table_name).insert(data);
    }

    async getFromTable(table_name: string, select: string = '*') {
        return await this.supabase.from(table_name).select(select);
    }

    async getFromTableFor(table_name: string, selectBy: string, selectId: number, select: string = '*') {
        return await this.supabase
            .from(table_name)
            .select(select)
            .eq(selectBy, selectId);
    }

    async fetchTodos() {
        return await this.supabase.from('todos').select('*').order('id', { ascending: false });
    }
}