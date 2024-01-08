import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { LogService } from './shared/log.service';

@Component({
    selector: 'dojo-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    pageTitle = 'App Component Page Title';
    showNavbar = true;

    constructor(
        private router: Router,
        private logService: LogService
    ) { }

    ngOnInit(): void {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                this.logService.log(`Route changed: ${event.url}`, 'darkviolet');
                if (event.url.includes('auth')) {
                    this.showNavbar = false;
                } else {
                    this.showNavbar = true;
                }
            }
        });
    }
}
