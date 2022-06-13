class Unit {
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number | undefined;
  stageHeight: number | undefined;

  constructor(ctx: CanvasRenderingContext2D | null) {
    this.ctx = ctx;

    this.update();
  }

  update: () => void = () => {};
}

export default Unit;
