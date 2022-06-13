import Drag from "./Drag";
import Unit from "./Unit";

class App {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number | undefined;
  stageHeight: number | undefined;
  startX: number | undefined;
  startY: number | undefined;
  endX: number | undefined;
  endY: number | undefined;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.style.background = "#000000";

    const starcraft = document.getElementById("starcraft");
    starcraft && starcraft.appendChild(this.canvas);

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    new Drag(this.ctx, this.stageWidth, this.stageHeight, this.getDragPos);
    new Unit(this.ctx);
  }

  getDragPos: (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
  ) => void = (startX: number, startY: number, endX: number, endY: number) => {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
  };

  resize: () => void = () => {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    }
  };
}

export default App;
