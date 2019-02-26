import { Component } from '@angular/core';
import { FlagOption } from './flag-option';

@Component({
    selector: 'app-format-bold',
    template: `<button [class.active]="active"
    (click)="applyTo(service.word)"><b>B</b></button>`,
})
export class Bold extends FlagOption {

    flag = 'b';
    keys = ['b'];
    styles = `.b { font-weight: bold; }`;

}
