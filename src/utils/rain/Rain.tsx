import Drop from "./Drop";

class Rain {
  particles: never[];
  rainRadius: number;
  stageWidth: number | undefined;
  posX: number | undefined;
  ctx: CanvasRenderingContext2D | null;
  constructor(
    ctx: CanvasRenderingContext2D | null,
    stageWidth: number | undefined,
  ) {
    this.ctx = ctx;
    this.particles = [];
    this.rainRadius = this.random(3, 7);
    this.stageWidth = stageWidth;

    this.init();
  }

  init() {
    this.draw();
  }

  createParticles() {}

  draw() {
    this.posX = this.stageWidth && this.random(1, this.stageWidth);
    new Drop(this.posX).draw(this.ctx, this.rainRadius);
  }

  random(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }
}

export default Rain;
