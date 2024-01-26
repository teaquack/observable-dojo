import { Component } from '@angular/core';
import { CatService } from '../cat.service';
import { Subject, take } from 'rxjs';
import { Router } from '@angular/router';
import { Cat } from '../cat';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogService } from '../../shared/modal-dialog.service';
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
        private modalDialogService: ModalDialogService
	) { };

	displayCatEmojis(): string {
		return '😻😼😹🙀';
	}

	goToCatDetails(cat: Cat): void {
		this.catService.selectCat(cat.id);
		this.router.navigateByUrl(`/cats/${cat.id}`)
        .catch(error => {
            console.log('Error navigating to cat details: ', error);
        });
	}

    goToCatHandlers(cat: Cat): void {
        // this.catService.selectCat(cat.id);
        this.router.navigateByUrl(`/cats/${cat.id}/handlers`)
        .catch(error => {
            console.log('Error navigating to cat handlers: ', error);
        });
    }

	onAddCatClick(): void {
        this.modalDialogService.isOpen = true;
        const dialogRef = this.dialog.open(CreateCatComponent, {
            // width: '400px'
        });

        dialogRef.afterClosed().pipe(
            take(1)
        ).subscribe(() => this.modalDialogService.isOpen = false);
	}

    isAddCatButtonDisabled(): boolean {
        return this.modalDialogService.isModalOpen();
    }
}
