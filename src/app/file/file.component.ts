import { Component, OnInit } from '@angular/core';

import { TextService } from '../text-service/text.service';


@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {

  constructor(
    private service: TextService,
  ) {
  }

  ngOnInit() {
    this.service.loadText();
  }

}
