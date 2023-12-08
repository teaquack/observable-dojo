import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatDialogService {
    isOpen = false;

    isModalOpen(): boolean {
        return this.isOpen;
    }
}
