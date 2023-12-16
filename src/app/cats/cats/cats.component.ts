import { Component } from '@angular/core';
import { CatService } from '../cat.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Cat } from '../cat';
import { MatDialog } from '@angular/material/dialog';
import { CatDialogService } from '../cat-dialog.service';
import { CreateCatComponent } from '../create-cat/create-cat.component';

@Component({
	selector: 'dojo-cats',
	templateUrl: './cats.component.html'
})
export class CatsComponent {
	pageTitle = 'Look at all them cats!';
	cats$ = this.catService.catsWithAdd$;
	private errorMessageSubject = new Subject<string>();
	errorMessage$ = this.errorMessageSubject.asObservable();

	constructor(
		private catService: CatService,
		private router: Router,
        private dialog: MatDialog,
        private catDialogService: CatDialogService
	) { };

	displayCats(): string {
		return '😻😼😹🙀';
	}

	goToCatDetails(cat: Cat): void {
		// console.log('go to cat details: ', cat.id);
		this.catService.selectCat(cat.id);
		this.router.navigateByUrl(`/cats/${cat.id}`);
	}

    goToCatHandlers(cat: Cat): void {
        this.catService.selectCat(cat.id);
        this.router.navigateByUrl(`/cats/${cat.id}/handlers`);
    }

	onAddCatClick(): void {
        this.catDialogService.isOpen = true;
        const dialogRef = this.dialog.open(CreateCatComponent, {
            // width: '400px'
        });

        dialogRef.afterClosed().subscribe(result => {
            this.catDialogService.isOpen = false;
        });
	}

    isAddCatButtonDisabled(): boolean {
        return this.catDialogService.isModalOpen();
    }
}
