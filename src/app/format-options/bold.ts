import { FlagOption } from './flag-option';


class Bold extends FlagOption {

    name = 'bold';
    flag = 'b';

    renderUI() {
        return `<button><b>B</b></button>`;
    }

    formatStyle() {
        return `.b { font-weight: bold; }`;
    }
}

export const bold = new Bold();
