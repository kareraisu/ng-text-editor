import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[view-ref]',
})
export class ViewRef {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
