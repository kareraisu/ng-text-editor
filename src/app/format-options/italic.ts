import { Component } from '@angular/core';
import { FlagOption } from './flag-option';

@Component({
    selector: 'app-format-italic',
    template: `<button [class.active]="active"
    (click)="applyTo(service.word)"><i>I</i></button>`,
})
export class Italic extends FlagOption {

    flag = 'i';
    keys = ['i'];
    styles = `.i { font-style: italic; }`;

}
