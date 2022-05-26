class Voyeurize {
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number | undefined;
  stageHeight: number | undefined;
  mousePosX: number | undefined;
  mousePosY: number | undefined;
  radius: number;

  constructor(
    ctx: CanvasRenderingContext2D | null,
    stageWidth: number | undefined,
    stageHeight: number | undefined,
  ) {
    this.ctx = ctx;
    this.radius = 250;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.mousePosX = 1;
    this.mousePosY = 1;

    document.addEventListener("mousemove", this.mousemove);
    document.addEventListener("mousedown", this.mousedown);
    document.addEventListener("mouseup", this.mouseup);

    this.update();
  }

  clear = () => {
    this.ctx &&
      this.stageWidth &&
      this.stageHeight &&
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
  };

  voyeurize = () => {
    if (
      this.ctx &&
      this.mousePosX &&
      this.mousePosY &&
      this.stageWidth &&
      this.stageHeight
    ) {
      const gradient = this.ctx.createRadialGradient(
        this.mousePosX,
        this.mousePosY,
        0,
        this.mousePosX,
        this.mousePosY,
        this.radius,
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(0.99, "rgba(0, 0, 0, 1)");

      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    }
  };

  update = () => {
    this.clear();
    this.voyeurize();
    requestAnimationFrame(this.update);
  };

  mousedown = (e: any) => {};

  mouseup = (e: any) => {};

  mousemove = (e: any) => {
    this.mousePosX = e.clientX;
    this.mousePosY = e.clientY;
  };
}

export default Voyeurize;
