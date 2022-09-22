import Rain from "./Rain";

class App {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  pixelRatio: number;
  stageWidth: number | undefined;
  stageHeight: number | undefined;
  count: number;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.background = "#000000";
    this.count = 500;
    const rainTag = document.getElementById("rain");
    rainTag && rainTag.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();
    this.update();

    this.startRain();
  }

  startRain: () => void = async () => {
    // for문에 timeout 시간만큼 delay걸기
    for (let i = 0; i < this.count; i++) {
      await new Promise<void>((resolve) =>
        setTimeout(() => {
          new Rain(this.ctx, this.stageWidth, this.stageHeight);
          resolve();
        }, 250),
      );
    }
  };

  update: () => void = () => {
    this.clear();
    requestAnimationFrame(this.update);
  };

  resize: () => void = () => {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    if (this.ctx) {
      this.ctx.scale(this.pixelRatio, this.pixelRatio);
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    }
  };

  clear: () => void = () => {
    this.stageWidth &&
      this.stageHeight &&
      this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
  };

  random: (min: number, max: number) => number = (min: number, max: number) => {
    return min + Math.floor(Math.random() * (max - min + 1));
  };
}

export default App;
