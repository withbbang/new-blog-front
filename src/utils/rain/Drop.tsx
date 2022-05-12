class Drop {
  posX: number | undefined;
  color: string;

  constructor(posX: number | undefined) {
    this.posX = posX;
    this.color = "#ebebff";
  }

  draw(ctx: CanvasRenderingContext2D | null, rainRadius: number) {
    if (ctx) {
      ctx.beginPath();
      this.posX && ctx.arc(this.posX, 10, rainRadius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.stroke();
    }
  }
}

export default Drop;
