import { Component } from '@angular/core';
import { FlagOption } from './flag-option';

@Component({
    selector: 'app-format-underline',
    template: `<button [class.active]="active"
    (click)="applyTo(service.word)"><u>U</u></button>`,
})
export class Underline extends FlagOption {

    flag = 'u';
    keys = ['u'];
    styles = `.u { text-decoration: underline; }`;

}
