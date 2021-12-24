import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MouseMeet';

  // Canvas stuff
  @ViewChild('myCanvas', { static: true })
    // @ts-ignore
  myCanvas: ElementRef<HTMLCanvasElement>;
  // @ts-ignore
  private ctx: CanvasRenderingContext2D;

  // Delay for sending requests
  delay = 100
  isDelayed = false;
  inField = false;
  private pos: {x: number, y: number} = {
    x: 0,
    y: 0
  };

  // True after mousemove, set false every interval
  hasMoved = false;
  // TODO: with socket
  hasUpdates = true;

  ngOnInit() {
    // @ts-ignore
    this.initializeCanvas()

    // Send position every 100 ms or so to the socket when in field and has updates
    setInterval(() => {
      // Does it need to be updated?
      if (this.inField && this.hasMoved && this.hasUpdates) {

        console.log(1);
        this.clearCanvas()
        this.renderElement(this.pos.x, this.pos.y)

        this.hasMoved = false;
      }
    }, this.delay);

    console.log(this.myCanvas)
  }

  enterField() {
    console.log('Entered');
    this.inField = true;
  }

  exitField() {
    console.log('Exited');
    this.inField = false;
  }

  moveCursor(event: MouseEvent) {
    this.pos = {x: event.offsetX, y: event.offsetY}
    this.hasMoved = true;
    // console.log(this.pos);

    // if (this.isDelayed) {
    //   setTimeout(() => {
    //     this.isDelayed = false
    //   }, this.delay);
    // } else { // if not, move and change isDelayed
    //   console.log('Moved');
    //   // console.log(event);
    //   this.isDelayed = true
    // }
  }

  initializeCanvas() {
    // @ts-ignore
    this.ctx = this.myCanvas.nativeElement.getContext('2d');
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
  }

  renderElement(x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.rect(x, y, 10, 10);
    this.ctx.stroke();
  }
}