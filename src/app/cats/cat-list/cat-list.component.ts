import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Cat } from '../interfaces/cat';
import { CatModalEvent, CatNavigationEvent } from '../interfaces/cat-list-event';

@Component({
    selector: 'dojo-cat-list',
    templateUrl: './cat-list.component.html'
})
export class CatListComponent {
    @Input() cats$!: Observable<Cat[]>;
    @Input() type!: string;
    @Input() isAddCatButtonDisabled!: boolean;
    @Output() navigate: EventEmitter<CatNavigationEvent> = new EventEmitter<CatNavigationEvent>();
    @Output() openModal: EventEmitter<CatModalEvent> = new EventEmitter<CatModalEvent>();

    goToCat(cat: Cat): void {
        console.log('Go to cat: ', cat);
        const event = <CatNavigationEvent>{ cat: cat, path: `/cats/${cat.id}`};
        this.navigate.emit(event);
    }

    goToCatHandlers(cat: Cat): void {
        console.log('Go to cat handlers: ', cat);
        const event = <CatNavigationEvent>{ path: `/cats/${cat.id}/handlers` };
        this.navigate.emit(event);
    }

    goToAddCat(): void {
        console.log('Go to add cat');
        const event = <CatModalEvent>{};
        this.openModal.emit(event);
    }
}
