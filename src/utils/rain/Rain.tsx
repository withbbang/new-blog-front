import Drop from "./Drop";

class Rain {
  particles: never[];
  rainRadius: number;
  stageWidth: number | undefined;
  posX: number | undefined;
  ctx: CanvasRenderingContext2D | null;
  rainWidth: number;
  rainHeight: number;
  animation: number | undefined;
  posY: number;
  test: undefined;

  constructor(
    ctx: CanvasRenderingContext2D | null,
    stageWidth: number | undefined,
  ) {
    this.ctx = ctx;
    this.posY = 10;
    this.particles = [];
    this.rainRadius = this.random(3, 7);
    this.rainWidth = this.random(1, 5);
    this.rainHeight = this.random(3, 20);
    this.stageWidth = stageWidth;

    this.init();
  }

  init() {
    this.draw();
  }

  createParticles() {}

  draw() {
    this.posX = this.stageWidth && this.random(1, this.stageWidth);
    new Drop(this.posX, this.posY).draw(
      this.ctx,
      this.rainWidth,
      this.rainHeight,
    );
    const func: any = this.draw.bind(this);
    this.animation = requestAnimationFrame(func);
    this.posY += 1;
  }

  random(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }
}

export default Rain;
