import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalDialogService {
    isOpen = false;

    isModalOpen(): boolean {
        return this.isOpen;
    }
}
