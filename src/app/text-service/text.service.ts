import { Injectable } from '@angular/core';

import { SynonymsService } from '../side-panel/synonyms.service';
import { Bold, Italic, Underline, Size } from 'src/app/format-options';

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
  _cursor: number;

  format_options_classes = [ Bold, Italic, Underline, Size ];
  format_options = [];

  constructor(
    private synonyms: SynonymsService,
  ) {
    document.body.addEventListener('keydown', this.onKeydown.bind(this));
  }

  get cursor() {
    return this._cursor;
  }
  set cursor(value) {
    this._cursor = value;
    document.documentElement.style.setProperty('--cursor', value / 2 + 'em');
  }

  onKeydown(event) {
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
        this.nextChar(event.ctrlKey);
        break;
      case 'ArrowLeft':
        this.prevChar(event.ctrlKey);
        break;
      default:
        break;
    }
    if (event.ctrlKey) {
      this.format_options.forEach(option => {
        if (option.keys.includes(event.key)) {
          option.applyTo(this.word, event.key);
          // prevent potential browser action
          event.preventDefault();
        }
      });
    }
    else if ( event.keyCode > 46 ) { this.input(event.key); }
  }

  addWhiteSpace(key: string) {
    const split = 0 < this.cursor && this.cursor < this.word.text.length;
    let new_word: Word = {text: '', format: {}};
    if (split) {
      new_word = {...this.word};
      this.word.text = this.word.text.slice(0, this.cursor);
      new_word.text = new_word.text.slice(this.cursor);
    }
    if (key !== 'Space') {
      // add whitespace element
      if (this.cursor > 0) { ++this.word_index; }
      this.text.splice(this.word_index, 0, {[key]: true});
    }
    if (split || this.word_index >= this.text.length - 1) {
      // add new word
      this.text.splice(this.word_index + 1, 0, new_word);
    }
    if (this.cursor > 0) { this.nextWord(); }
  }

  backspace() {
    if (this.cursor === 0 && this.word_index > 0) {
      this.prevWord();
      if (this.word.text) {
        this.cursor = this.word.text.length;
        this.joinWords();
      } else {
        // delete space element
        this.text.splice(this.word_index, 1);
      }
    } else {
      this.word.text = this.word.text
        .slice(0, this.cursor - 1)
        .concat(this.word.text.slice(this.cursor));
      --this.cursor;
    }
  }

  delete() {
    if (this.isLastChar && !this.isLastWord) {
      this.joinWords();
    } else {
      this.word.text = this.word.text
        .slice(0, this.cursor)
        .concat(this.word.text.slice(this.cursor + 1));
    }
  }

  nextChar(jump) {
    if (!this.word.text || this.isLastChar ) {
      this.nextWord();
    } else {
      this.cursor = jump ? this.word.text.length : this.cursor + 1;
    }
  }

  prevChar(jump) {
    if (this.cursor === 0) {
      this.prevWord();
    } else {
      this.cursor = jump ? 0 : this.cursor - 1;
    }
  }

  nextWord() {
    if (!this.isLastWord) { this.selectWord(++this.word_index); }
  }

  prevWord() {
    if (this.word_index > 0) {
      this.selectWord(--this.word_index);
      if (this.word.text) { this.cursor = this.word.text.length; }
    }
  }

  get isLastChar() {
    return this.cursor === this.word.text.length;
  }

  get isLastWord() {
    return this.word_index === this.text.length - 1;
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
    if (this.word.text) {
      this.format_options.forEach(option => option.updateStateFor(this.word));
    }
    // this.synonyms.getSynonymsFor(this.word.text);
  }

  joinWords() {
    const [deleted] = this.text.splice(this.word_index + 1, 1);
    this.word.text += deleted.text;
  }

  genClassesFor(word: Word): string {
    return this.format_options.map(option => option.genClassesFor(word)).join(' ');
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
    styles.innerHTML = this.format_options.map(option => option.styles).join(' ');
    document.head.appendChild(styles);
  }

}
