import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { SynonymsService } from './synonyms.service';


@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {

  constructor(private service: SynonymsService) { }

  ngOnInit() {
  }

}
