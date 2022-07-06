import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {io, Socket} from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket = io('http://localhost:3000');
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public entrance$: BehaviorSubject<object> = new BehaviorSubject({});
  public leave$: BehaviorSubject<string> = new BehaviorSubject('');
  public movement$: BehaviorSubject<string> = new BehaviorSubject('');

  public sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  public getMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  sendEnter(username: string) {
    this.socket.emit('enter', username);
  }

  public getEnter = () => {
    this.socket.on('enter', (entrance) =>{
      this.entrance$.next(entrance);
    });

    return this.entrance$.asObservable();
  };

  sendLeave() {
    this.socket.emit('leave');
  }

  public getLeave = () => {
    this.socket.on('leave', (leave) =>{
      this.leave$.next(leave);
    });

    return this.leave$.asObservable();
  };

  sendMovement(pos: object) {
    this.socket.emit('movement', pos);
  }

  public getMovement = () => {
    this.socket.on('leave', (movement) =>{
      this.movement$.next(movement);
    });

    return this.movement$.asObservable();
  };
}
