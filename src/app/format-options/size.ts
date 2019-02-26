import { Component } from '@angular/core';
import { FormatOption } from './format-option';

@Component({
    selector: 'app-format-size',
    template: `<input type="number" min="{{min}}" max="{{max}}"
    [value]="value" (change)="applyTo(service.word, $event.target.value)"/>`,
})
export class Size implements FormatOption {

    keys = ['+', '-'];
    styles = `.s1 { font-size: 1em; } .s2 { font-size: 1.2em; } .s3 { font-size: 1.4em; }`;

    value = 1;
    min = 1;
    max = 3;
    service;

    applyTo(word, value) {
        if (!value) { return; }
        if (word.format.size === undefined) { word.format.size = 1; }
        switch (value) {
            case '+':
                if (this.value === this.max) { return; }
                this.value++;
                break;
            case '-':
                if (this.value === this.min) { return; }
                this.value--;
                break;
            default:
                this.value = value;
                break;
        }
        word.format.size = this.value;
    }

    updateStateFor(word) {
        this.value = word.format.size || 1;
    }

    genClassesFor(word) {
        return word.format.size ? 's' + word.format.size : '';
    }
}
