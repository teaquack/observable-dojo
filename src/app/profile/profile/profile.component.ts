import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/shared/supabase.service';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'dojo-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    pageTitle = 'Profile Page';
    profile!: Profile;

    constructor(private profileService: ProfileService) { }

    async ngOnInit() {
        await this.profileService.getProfile();
    }
}
