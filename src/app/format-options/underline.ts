import { FlagOption } from './flag-option';


class Underline extends FlagOption {

    name = 'underline';
    flag = 'u';

    renderUI() {
        return `<button><u>U</u></button>`;
    }

    formatStyle() {
        return `.u { text-decoration: underline; }`;
    }
}

export const underline = new Underline();
