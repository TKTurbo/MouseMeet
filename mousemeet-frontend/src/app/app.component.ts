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
  // currentMice = Array<{socketId: string, username: string, x: number, y: number}>;
  currentMice: Array<{socketId: string, username: string, x: number, y: number}> = [];

  // True after mousemove, set false every interval
  hasMoved = false;
  // TODO: with socket
  hasUpdates = true;
  username = 'anonymous'

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    // Get simple messages
    this.socketService.getMessage().subscribe((message: string) => {
      // console.log(message);
    });

    // Get enters
    this.socketService.getEnter().subscribe((entrance: object) => {
      console.log(entrance);
      console.log(typeof entrance);
      let entranceObj = entrance;
      this.currentMice.push({socketId: entranceObj.socketId, username: entranceObj.username, x: 0, y: 0})
    });

    // Get leaves
    this.socketService.getLeave().subscribe((socketId: string) => {
      // console.log(socketId);
    });


      // TODO: On mousefield change, update the canvas

    // @ts-ignore
    this.initializeCanvas()

    // Send position every 100 ms or so to the socket when in field and has updates
    setInterval(() => {
      // Does it need to be updated?
      if (this.inField && this.hasMoved) {

        this.clearCanvas();
        // this.renderElement(this.pos.x, this.pos.y, this.username);
        this.socketService.sendMovement(this.pos);

        this.hasMoved = false;
      }
    }, this.delay);

  }

  enterField() {
    this.inField = true;
    this.socketService.sendEnter(this.username);
  }

  exitField() {
    this.inField = false;
    this.socketService.sendLeave();
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
   * @param username
   */
  renderElement(x: number, y: number, username: string) {
    this.ctx.beginPath();
    this.ctx.drawImage(this.defaultCursor.nativeElement, x, y, 10, 16);
    this.ctx.stroke();
    this.ctx.font = "10px Arial";
    this.ctx.fillText(username, x, y);
  }
}
