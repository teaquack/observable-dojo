import { Component } from '@angular/core';
import { CatService } from '../cat.service';
import { Subject, combineLatest, map, take } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogService } from '../../shared/modal-dialog.service';
import { CreateCatComponent } from '../create-cat/create-cat.component';
import { AuthService } from 'src/app/auth/auth.service';
import { CatModalEvent, CatNavigationEvent } from '../interfaces/cat-list-event';

@Component({
    selector: 'dojo-cats',
    templateUrl: './cats.component.html'
})
export class CatsComponent {
    pageTitle = 'Look at all them cats!';
    cats$ = this.catService.catsWithAdd$;
    private errorMessageSubject = new Subject<string>();
    errorMessage$ = this.errorMessageSubject.asObservable();
    userCats$ = combineLatest([
        this.authService.getSession(),
        this.catService.catsWithAdd$
    ]).pipe(
        map(([session, cats]) => cats.filter(cat => cat.user_id === session?.user.id))
    );

    otherCats$ = combineLatest([
        this.authService.getSession(),
        this.catService.catsWithAdd$
    ]).pipe(
        map(([session, cats]) => cats.filter(cat => cat.user_id !== session?.user.id))
    );

    constructor(
        private catService: CatService,
        private router: Router,
        private dialog: MatDialog,
        private modalDialogService: ModalDialogService,
        private authService: AuthService
    ) { };

    displayCatEmojis(): string {
        return '😻😼😹🙀';
    }

    onNavigate(catNavigationEvent: CatNavigationEvent): void {
        console.log('Cat navigation event: ', JSON.parse(JSON.stringify(catNavigationEvent)));
        if (catNavigationEvent.cat && (catNavigationEvent.path === `/cats/${catNavigationEvent.cat.id}`)) {
            this.catService.selectCat(catNavigationEvent.cat.id);
        }

        this.router.navigateByUrl(catNavigationEvent.path)
            .catch(error => {
                console.log('Error navigating to cat details: ', error);
            });
    }

    onOpenModal(catModalEvent: CatModalEvent): void {
        const modalPreferences = <any>{
            width: catModalEvent.width ? catModalEvent.width : null, // 400px
            height: catModalEvent.height ? catModalEvent.height : null
        }
        this.onAddCatClick(modalPreferences);
    }

    onAddCatClick(modalPreferences: any = null): void {
        this.modalDialogService.isOpen = true;
        const dialogRef = this.dialog.open(CreateCatComponent,
            modalPreferences
        );

        dialogRef.afterClosed().pipe(
            take(1)
        ).subscribe(() => this.modalDialogService.isOpen = false);
    }

    isAddCatButtonDisabled(): boolean {
        return this.modalDialogService.isModalOpen();
    }
}
