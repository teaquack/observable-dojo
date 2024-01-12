import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LogService {

    constructor() { }

    log(message: any, color: string): void {
        console.log(`%c${message}`, `color: ${color}; font-weight: bold;`);
    }
}
