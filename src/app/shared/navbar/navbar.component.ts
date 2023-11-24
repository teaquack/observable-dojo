import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { checkDetailsNavbarUrl } from '../utility';

@Component({
	selector: 'dojo-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	pageTitle = '🐈';
	showDetailsNavbar = false;

	constructor(
		private router: Router
	) { }

	ngOnInit(): void {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.showDetailsNavbar = checkDetailsNavbarUrl(this.router.url);
			}
		});
	}
}
