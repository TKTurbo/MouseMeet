import {Component, ElementRef, ViewChild} from '@angular/core';
import {SocketService} from "./socket-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MouseMeet';

  // TODO: add these to constructor instead of here

  // Canvas stuff
  @ViewChild('myCanvas', {static: true})
    // @ts-ignore
  myCanvas: ElementRef<HTMLCanvasElement>;
  // @ts-ignore
  private ctx: CanvasRenderingContext2D;

  @ViewChild('defaultCursor', {static: true})
    // @ts-ignore
  defaultCursor: ElementRef<HTMLCanvasElement>;

  // Delay for sending requests
  delay = 100
  isDelayed = false;
  inField = false;
  private pos: { x: number, y: number } = {
    x: 0,
    y: 0
  };

  // TODO: current active players
  currentMice = [

    ]

  // True after mousemove, set false every interval
  hasMoved = false;
  // TODO: with socket
  hasUpdates = true;
  username = 'anonymous'

  constructor(private socketService: SocketService,) {}

  ngOnInit() {
    // Socket
      this.socketService.onNewMessage().subscribe(msg => {
        console.log('got a msg: ' + msg);
      });

      // TODO: On mousefield change, update the canvas

    // @ts-ignore
    this.initializeCanvas()

    // Send position every 100 ms or so to the socket when in field and has updates
    setInterval(() => {
      // Does it need to be updated?
      if (this.inField && this.hasMoved) {

        this.clearCanvas()
        this.renderElement(this.pos.x, this.pos.y)
        this.pushMessage()

        this.hasMoved = false;
      }
    }, this.delay);

  }

  enterField() {
    this.inField = true;
    this.socketService.sendMessage(this.username + ' entered');
  }

  exitField() {
    this.inField = false;
    this.socketService.sendMessage(this.username + ' exited');
  }

  moveCursor(event: MouseEvent) {
    this.pos = {x: event.offsetX, y: event.offsetY}
    this.hasMoved = true;
  }

  initializeCanvas() {
    // @ts-ignore
    this.ctx = this.myCanvas.nativeElement.getContext('2d');
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
  }

  /**
   * Renders an element: a player with their name and cursor
   * @param x
   * @param y
   */
  renderElement(x: number, y: number) {
    this.ctx.beginPath();
    // this.ctx.rect(x, y, 10, 10);
    this.ctx.drawImage(this.defaultCursor.nativeElement, x, y, 10, 16);
    this.ctx.stroke();
    this.ctx.font = "10px Arial";
    this.ctx.fillText(this.username, x, y);
  }

  /**
   * Sends a basic message using the SocketService
   */
  pushMessage(){
    this.socketService.sendMessage('moiiii');
  }

  pushPosition() {

  }

  pushEntrance() {

  }

  pushExit() {

  }
}
