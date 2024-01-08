import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
    selector: 'dojo-return-home-button',
    templateUrl: './return-home-button.component.html',
    animations: [
      trigger('catAnimation', [
        state('hidden', style({
          transform: 'translateX(100%)'
        })),
        state('visible', style({
          transform: 'translateX(0)'
        })),
        transition('hidden <=> visible', animate('300ms ease-out'))
      ])
    ]
})
export class ReturnHomeButtonComponent {
    buttonState = 'visible';

    toggleButton() {
        this.buttonState = this.buttonState === 'hidden' ? 'visible' : 'hidden';
    }
}
