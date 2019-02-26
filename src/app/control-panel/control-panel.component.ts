import { Component, ViewChild, ComponentFactoryResolver, AfterViewInit } from '@angular/core';

import { ViewRef } from './view-ref.directive';
import { FormatOption } from '../format-options';
import { TextService } from '../text-service/text.service';

@Component({
  selector: 'app-control-panel',
  template: `<ng-template view-ref></ng-template>`,
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements AfterViewInit {
  options = [];
  @ViewChild(ViewRef) directive: ViewRef;

  constructor(
    private factoryResolver: ComponentFactoryResolver,
    private service: TextService,
  ) { }

  loadOption(option) {
    const factory = this.factoryResolver.resolveComponentFactory(option);
    const component = this.directive.viewContainerRef.createComponent(factory);
    const instance = (<FormatOption>component.instance);
    instance.service = this.service;
    this.options.push(instance);
  }

  clearOptions() {
    this.options = [];
    this.directive.viewContainerRef.clear();
  }

  ngAfterViewInit() {
    this.service.format_options_classes.forEach(option => this.loadOption(option));
    this.service.format_options = this.options;
    this.service.loadFormatStyles();
  }

}
