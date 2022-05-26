import Voyeurize from "./Voyeurize";

class App {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  pixelRatio: number;
  stageWidth: number | undefined;
  stageHeight: number | undefined;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.opacity = "0.999";
    const hiddenImage = document.getElementById("hiddenImage");
    hiddenImage && hiddenImage.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    new Voyeurize(this.ctx, this.stageWidth, this.stageWidth);
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    if (this.ctx) {
      this.ctx.scale(this.pixelRatio, this.pixelRatio);
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    }
  }
}

export default App;
