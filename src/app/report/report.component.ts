import { Component, OnInit } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value  
    width : 500,
    height : 400,
    overflow: false,
  }
 
  data: Array<CloudData> = [
    {text: 'Weight-10-link-color', weight: 10},
    {text: 'Weight-10-link', weight: 10},
    {text: 'Weight-9-link-color', weight: 9},
    {text: 'Weight-8', weight: 8}
  ]

}
