import { Injectable } from '@angular/core';

import { SynonymsService } from '../side-panel/synonyms.service';
import { bold, italic, underline } from 'src/app/format-options';

export interface Word {
  text?: string;
  format?: {
    flags?: string[];
    color?: string;
  };
}

@Injectable()
export class TextService {

  text: Word[];

  current: Word;

  format_options = [ bold, italic, underline ];

  constructor(
    private synonyms: SynonymsService,
  ) {}

  selectWord(word: Word) {
    this.current = word;
    this.format_options.forEach(option => option.updateStateFor(word));
    this.synonyms.getSynonymsFor(word.text);
  }

  transformPlainTextToRichText(plain_text: string): Word[] {
    return plain_text.split(' ').map(text => ({text, format: {}}));
  }

  async getMockText() {
    return new Promise<string>(function (resolve) {
      resolve('A year ago I was in the audience at a gathering of designers in San Francisco. ' +
        'There were four designers on stage, and two of them worked for me. I was there to support them. ' +
        'The topic of design responsibility came up, possibly brought up by one of my designers, I honestly don’t remember the details. ' +
        'What I do remember is that at some point in the discussion I raised my hand and suggested, to this group of designers, ' +
        'that modern design problems were very complex. And we ought to need a license to solve them.');
    });
  }

  async loadText() {
    const text = await this.getMockText();
    this.text = this.transformPlainTextToRichText(text);
  }

}
