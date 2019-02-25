import { Word } from 'src/app/text-service/text.service';

export interface FormatOption {
    name: string;
    flag?: string;
    key?: string;
    renderUI(): string;
    formatStyle(): string;
    updateStateFor(word: Word): void;
    applyTo(word: Word, value?: any): void;
}
