import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SlidebarComponent implements OnInit {

  @Input() rangeValue: number;
  @Input() barColor: string;

  constructor() { }

  ngOnInit() {
  }

}
