import { FlagOption } from './flag-option';


class Italic extends FlagOption {

    name = 'italic';
    flag = 'i';

    renderUI() {
        return `<button><i>I</i></button>`;
    }
}

export const italic = new Italic();
