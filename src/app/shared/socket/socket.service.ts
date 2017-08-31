import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as socketIo from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable()
export class SocketService {
  private eventCallback: Subject<any[]> = new Subject<any>();
  eventCallback$ = this.eventCallback.asObservable();
  private socket;


  constructor() {
    this.initSocket();
    this.socket.on('test', (data) => {
      const msg = [{ 'type': 'chat', 'data': data }];
      this.eventCallback.next(msg);
    });
    this.socket.on('tone', (data) => {
      const tone = [{ 'type': 'tone', 'data': data }];
      this.eventCallback.next(tone);
    });
    this.socket.on('recommendations', (data) => {
      const tone = [{ 'type': 'recommendations', 'data': data }];
      this.eventCallback.next(tone);
    });
    this.socket.on('danger', (data) => {
      const tone = [{ 'type': 'danger', 'data': data }];
      this.eventCallback.next(tone);
    });
    this.socket.on('sentiment', (data) => {
      const tone = [{ 'type': 'sentiment', 'data': data }];
      this.eventCallback.next(tone);
    });
  }

  private initSocket(): void {
    this.socket = socketIo(environment.baseUrl);
  }

  //
  // disconnect() {
  //   this.socket.disconnect();
  // }

  // send(): void {
  //   console.log(this.socket.io.engine.id, 'socket.--io.engine.id');
  //   this.socket.emit('add-message', '');
  // }

  // public get(): Observable<any> {
  //   debugger
  //   const observable = new Observable(observer => {
  //     this.socket.on('message', (data) => {
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   });
  //   return observable;
  // }

}
