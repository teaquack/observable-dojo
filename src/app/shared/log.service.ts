import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LogService {

    constructor() { }

    log(message: string, color: string): void {
        console.log(`%c${message}`, `color: ${color}; font-weight: bold;`);
    }
}
