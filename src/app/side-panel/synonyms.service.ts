import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

type APIResults = Array<{
  word: string,
  score: number,
}>;

@Injectable()
export class SynonymsService {

  synonyms: string[];

  constructor(private http: HttpClient) {

  }

  getSynonymsFor(word: string) {
    this.http.get('https://api.datamuse.com/words?ml=' + word.replace(/[,/.]/, ''))
      .toPromise()
      .then(
        (res: APIResults) => {
          this.synonyms = res.map(el => el.word);
        },
        error => {
          console.error('Error while getting synonyms for [%s]:', word, error);
        }
      );
  }
}
