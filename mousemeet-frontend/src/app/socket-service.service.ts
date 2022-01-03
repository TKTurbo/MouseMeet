import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {io, Socket} from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  // Emit basic message
  sendMessage(msg: string) {
    this.socket.emit('sendMessage', {message: msg});
  }

  // Handle basic message
  onNewMessage() {
    return new Observable(observer => {
      this.socket.on('newMessage', msg => {
        observer.next(msg);
      });
    });
  }

  sendEnter() {

  }

  sendLeave() {

  }

  sendMovement() {

  }

  /**
   * Whenever someone enters, leaves or moves, the mousefield needs to be updated.
   * The mousefield should be an array with objects that contain a socket id, a username and a position
   */
  onMouseFieldUpdate() {

  }
}
