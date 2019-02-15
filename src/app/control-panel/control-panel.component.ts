import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TextService } from '../text-service/text.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {

  constructor(private service: TextService) {

  }

}
