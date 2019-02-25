import { FlagOption } from './flag-option';


class Italic extends FlagOption {

    name = 'italic';
    flag = 'i';
    key = 'i';

    renderUI() {
        return `<button><i>I</i></button>`;
    }

    formatStyle() {
        return `.i { font-style: italic; }`;
    }
}

export const italic = new Italic();
