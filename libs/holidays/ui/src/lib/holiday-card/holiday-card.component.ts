import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Holiday } from '@eternal/holidays/model';

@Component({
  selector: 'eternal-holiday-card',
  templateUrl: './holiday-card.component.html',
  styleUrls: ['./holiday-card.component.scss']
})
export class HolidayCardComponent implements OnInit {
  @Input() holiday: Holiday | undefined;
  @Output() brochureClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
