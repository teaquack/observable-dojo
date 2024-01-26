import { Injectable } from '@angular/core';
import { SupabaseService } from '../shared/supabase.service';
import { AuthService } from '../auth/auth.service';
import { User } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    session = this.authService.getSession();
    profile: any;
    loading = true;

    constructor(private supabaseService: SupabaseService, private authService: AuthService) { }

    async getProfile() {
        // try {
        //     if (this.session instanceof User && this.session.user) {
        //         await this.getProfileForUser(this.session.user);
        //     }
        //     const { data: profile, error, status } = await this.supabaseService.getProfile(this.session?.user);

        //     if (error && status !== 406) {
        //         throw error;
        //     }

        //     if (profile) {
        //         this.profile = profile;
        //     }
        // } catch (error) {
        //     if (error instanceof Error) {
        //         alert(error.message)
        //     }
        // } finally {
        //     this.loading = false;
        // }
    }
}
