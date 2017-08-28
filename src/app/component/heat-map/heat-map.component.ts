import { Component, OnInit, ViewEncapsulation, Input} from '@angular/core';

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeatMapComponent implements OnInit {

  @Input() rangeValue: number;
  constructor() { }
  ngOnInit() {
  }
}
