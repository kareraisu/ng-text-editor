import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  types = 'html style script url resourceUrl';

  constructor(private sanitizer: DomSanitizer) { }

  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    if ( !this.types.includes(type) ) { throw new Error(`Invalid safe type specified: ${type}`); }
    return this.sanitizer['bypassSecurityTrust' + capitalize(type)](value);
  }
}

function capitalize(string: string): string {
  return string[0].toUpperCase().concat(string.substring(1));
}
