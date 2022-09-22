class Particles {
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number | undefined;
  stageHeight: number | undefined;
  posX: number | undefined;
  posY: number | undefined;
  radius: number;

  constructor(
    ctx: CanvasRenderingContext2D | null,
    stageWidth: number | undefined,
    stageHeight: number | undefined,
    posX: number | undefined,
    rainWidth: number,
  ) {
    this.ctx = ctx;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.posX = posX;
    this.posY = stageHeight;
    this.radius = rainWidth;
  }

  createParticles: () => void = () => {};
}

export default Particles;
