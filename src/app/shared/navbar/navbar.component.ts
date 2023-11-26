import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { checkDetailsNavbarUrl } from '../utility';
import { CatService } from 'src/app/cats/cat.service';

@Component({
	selector: 'dojo-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	pageTitle = '🐈';
	showDetailsNavbar = false;

	selectedCat$ = this.catService.selectedCat$;

	constructor(
		private router: Router,
		private catService: CatService
	) { }

	ngOnInit(): void {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.showDetailsNavbar = checkDetailsNavbarUrl(this.router.url);
			}
		});
	}
}
