import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-emotion-graph',
  templateUrl: './emotion-graph.component.html',
  styleUrls: ['./emotion-graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EmotionGraphComponent implements OnInit {

  @Input() emotionText: string;
  @Input() emotionValue: number;
  @Input() emotionColor: any;

  constructor() { }

  ngOnInit() {
  }

}
