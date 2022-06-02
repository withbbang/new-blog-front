import Paint from "./Paint";

class App {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number | undefined;
  stageHeight: number | undefined;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.background = "#FFFFFF";
    const movingCharacter = document.getElementById("paint");
    movingCharacter && movingCharacter.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");

    window.addEventListener("resize", this.resize.bind(this), false);
    document
      .getElementById("download")
      ?.addEventListener("click", this.download);
    document.getElementById("clear")?.addEventListener("click", this.clear);
    this.resize();

    new Paint(this.ctx);
  }

  download: () => void = () => {
    const image = this.canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "Paint[🎨]";
    link.click();
  };

  clear: () => void = () => {
    this.ctx &&
      this.stageWidth &&
      this.stageHeight &&
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
  };

  resize: () => void = () => {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.ctx && this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
  };
}

export default App;
