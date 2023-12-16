import { Injectable } from '@angular/core'
import {
    AuthChangeEvent,
    AuthSession,
    createClient,
    Session,
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
    private supabase: SupabaseClient
    // _session: AuthSession | null = null

    constructor() {
        this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    }

    // get session() {
    //   this.supabase.auth.getSession().then(({ data }) => {
    //     this._session = data.session
    //   })
    //   return this._session
    // }

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

    // profile(user: User) {
    //   return this.supabase
    //     .from('profiles')
    //     .select(`username, website, avatar_url`)
    //     .eq('id', user.id)
    //     .single()
    // }

    // authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    //   return this.supabase.auth.onAuthStateChange(callback)
    // }

    // signIn(email: string) {
    //   return this.supabase.auth.signInWithOtp({ email })
    // }

    // signOut() {
    //   return this.supabase.auth.signOut()
    // }

    // updateProfile(profile: Profile) {
    //   const update = {
    //     ...profile,
    //     updated_at: new Date(),
    //   }

    //   return this.supabase.from('profiles').upsert(update)
    // }

    // downLoadImage(path: string) {
    //   return this.supabase.storage.from('avatars').download(path)
    // }

    // uploadAvatar(filePath: string, file: File) {
    //   return this.supabase.storage.from('avatars').upload(filePath, file)
    // }
}