import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chatline',
  moduleId: module.id,
  templateUrl: 'chatline.html',
  encapsulation: ViewEncapsulation.None
})

export class ChatLineComponent implements OnInit {
  // @Input('chatInfo') element: {
  //   timeLineClass: string;
  //   chatContent: any;
  // };
   @Input() timeLineClass: string;
   @Input() chatContent: string;
  //
   chatSide: string;

  ngOnInit() {
    if (this.timeLineClass = 'therapist') {
      this.chatSide = 'chat-timeline-right';
    } else {
      this.chatSide = 'chat-timeline-left';
    }
  }
}
