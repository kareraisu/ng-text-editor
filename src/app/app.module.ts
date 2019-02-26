import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FileComponent } from './file/file.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Bold, Italic, Underline, Size } from './format-options';

import { TextService } from './text-service/text.service';
import { SynonymsService } from './side-panel/synonyms.service';

import { ViewRef } from './control-panel/view-ref.directive';


@NgModule({
  declarations: [
    AppComponent,
    FileComponent,
    ControlPanelComponent,
    SidePanelComponent,
    HeaderComponent,
    FooterComponent,
    ViewRef,
    Bold, Italic, Underline, Size,
  ],
  entryComponents: [
    Bold, Italic, Underline, Size,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    TextService,
    SynonymsService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
