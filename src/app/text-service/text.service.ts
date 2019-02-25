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

const CONTROL_KEYS = 'Control Shift Alt'.split(' ');
const WHITE_SPACES = 'Space Tab Enter'.split(' ');

@Injectable()
export class TextService {

  text: Word[];
  word: Word;
  word_index: number;
  cursor: number;
  format_options = [ bold, italic, underline ];

  constructor(
    private synonyms: SynonymsService,
  ) {
    document.body.addEventListener('keydown', this.onKeydown.bind(this));
    this.loadFormatStyles();
  }

  onKeydown(event) {
    if ( event.keyCode > 46 ) { this.input(event.key); }
    if ( CONTROL_KEYS.includes(event.key) ) { return; }
    if ( WHITE_SPACES.includes(event.code) ) { this.addWhiteSpace(event.code); }
    // tslint:disable-next-line:curly
    else switch (event.key) {
      case 'Backspace':
        this.backspace();
        break;
      case 'Delete':
        this.delete();
        break;
      case 'ArrowRight':
        event.ctrlKey ? this.nextWord() : this.nextChar();
        break;
      case 'ArrowLeft':
        event.ctrlKey ? this.prevWord() : this.prevChar();
        break;
      default:
        break;
    }
  }

  addWhiteSpace(key: string) {
    const split = this.cursor < this.word.text.length;
    if (split) {
      this.splitWord();
    }
    if (key !== 'Space') {
      // add whitespace element
      this.text.splice(this.word_index + 1, 0, {[key]: true});
      this.nextWord();
    }
    if ( !split ) {
      // add new word
      this.text.splice(this.word_index + 1, 0, {text: '', format: {}});
      this.nextWord();
    }
  }

  backspace() {
    if (this.cursor === 0) {
      this.prevWord();
      this.cursor = this.word.text.length;
      this.joinWords();
    } else {
      this.word.text = this.word.text
        .slice(0, this.cursor - 1)
        .concat(this.word.text.slice(this.cursor));
      --this.cursor;
    }
  }

  delete() {
    if (this.cursor === this.word.text.length) {
      this.joinWords();
    } else {
      this.word.text = this.word.text
        .slice(0, this.cursor)
        .concat(this.word.text.slice(this.cursor + 1));
    }
  }

  nextChar() {
    if (this.cursor === this.word.text.length) {
      this.nextWord();
    } else {
      ++this.cursor;
    }
  }

  prevChar() {
    if (this.cursor === 0) {
      this.prevWord();
      this.cursor = this.word.text.length;
    } else {
      --this.cursor;
    }
  }

  nextWord() {
    this.selectWord(++this.word_index);
  }

  prevWord() {
    this.selectWord(--this.word_index);
  }

  input(key: string) {
    const updated = this.word.text.split('');
    updated.splice(this.cursor, 0, key);
    this.word.text = updated.join('');
    ++this.cursor;
  }

  selectWord(index: number, reset_cursor = true) {
    if (reset_cursor) { this.cursor = 0; }
    this.word_index = index;
    this.word = this.text[index];
    this.format_options.forEach(option => option.updateStateFor(this.word));
    // this.synonyms.getSynonymsFor(this.word.text);
  }

  splitWord() {
    const new_word = {...this.word};
    this.word.text = this.word.text.slice(0, this.cursor);
    new_word.text = new_word.text.slice(this.cursor);
    this.text.splice(this.word_index + 1, 0, new_word);
    this.nextWord();
  }

  joinWords() {
    const [deleted] = this.text.splice(this.word_index + 1, 1);
    this.word.text += deleted.text;
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

  loadFormatStyles() {
    const styles = document.createElement('style');
    styles.innerHTML = this.format_options.map(option => option.formatStyle()).join(' ');
    document.head.appendChild(styles);
  }

}
