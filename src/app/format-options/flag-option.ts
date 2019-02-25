import { FormatOption } from './format-option';


export abstract class FlagOption implements FormatOption {

    name = '';
    flag = '';
    active = false;

    renderUI() {
        return `<button>flag</button>`;
    }

    formatStyle() {
        return ``;
    }

    updateStateFor(word) {
        this.active = word.format.flags && word.format.flags.includes(this.flag);
    }

    applyTo(word) {
        if (!word || !word.text || !word.text.length) { return; }
        if (!word.format.flags) { word.format.flags = []; }
        if (this.active) {
            word.format.flags.splice(word.format.flags.indexOf(this.flag), 1);
            this.active = false;
        } else {
            word.format.flags.push(this.flag);
            this.active = true;
        }
    }

}
