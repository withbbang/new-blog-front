class Drop {
  posX: number | undefined;
  posY: number;
  color: string;

  constructor(posX: number | undefined, posY: number) {
    this.posX = posX;
    this.posY = posY;
    this.color = "#87ceeb";
  }

  draw(
    ctx: CanvasRenderingContext2D | null,
    rainWidth: number,
    rainHeight: number,
  ) {
    if (ctx) {
      ctx.beginPath();

      if (this.posX) {
        ctx.moveTo(this.posX, this.posY);
        ctx.lineTo(this.posX, this.posY + rainHeight);
      }

      ctx.lineWidth = rainWidth;
      ctx.strokeStyle = this.color;
      ctx.fillStyle = this.color;

      ctx.stroke();
      ctx.closePath();
    }

    this.posX &&
      ctx?.clearRect(
        this.posX,
        this.posY,
        this.posX + rainWidth,
        this.posY + rainHeight,
      );
  }
}

export default Drop;
