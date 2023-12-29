import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class IconService {
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) { }

    registerIcons(icons: { name: string, path: string }[]) {
        icons.forEach(icon => {
            this.matIconRegistry.addSvgIcon(
                icon.name,
                this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
            );
        });
    }
}
