import { FlagOption } from './flag-option';


class Bold extends FlagOption {

    name = 'bold';
    flag = 'b';

    renderUI() {
        return `<button><b>B</b></button>`;
    }
}

export const bold = new Bold();
