import { Word } from 'src/app/text-service/text.service';

export interface FormatOption {
    keys: string[];
    styles: string;
    service?: any;
    applyTo(word: Word, value?: any): void;
    updateStateFor(word: Word): void;
    genClassesFor(word: Word): string;
}
