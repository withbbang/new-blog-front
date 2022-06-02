class Paint {
  ctx: CanvasRenderingContext2D | null;
  posX: number | undefined | null;
  posY: number | undefined | null;
  isDrawing: boolean;

  constructor(ctx: CanvasRenderingContext2D | null) {
    this.ctx = ctx;
    this.isDrawing = false;

    document.addEventListener("mousedown", this.mousedown);
    document.addEventListener("mouseup", this.mouseup);
    document.addEventListener("mousemove", this.mousemove);
    document.addEventListener("touchstart", this.touchstart);
    document.addEventListener("touchend", this.touchend);
    document.addEventListener("touchmove", this.touchmove);
  }

  mousedown: (e: any) => void = (e: any) => {
    this.isDrawing = true;
    this.ctx?.beginPath();
    this.posX = e.offsetX;
    this.posY = e.offsetY;
    this.posX && this.posY && this.ctx?.moveTo(this.posX, this.posY);
  };

  mouseup: () => void = () => {
    this.isDrawing = false;
  };

  mousemove: (e: any) => void = (e: any) => {
    this.posX = e.offsetX;
    this.posY = e.offsetY;

    this.draw();
  };

  touchstart: (e: any) => void = (e: any) => {
    this.isDrawing = true;
    this.ctx?.beginPath();
    this.posX = e.touches[0].clientX;
    this.posY = e.touches[0].clientY;
    this.posX && this.posY && this.ctx?.moveTo(this.posX, this.posY);
  };

  touchend: () => void = () => {
    this.isDrawing = false;
  };

  touchmove: (e: any) => void = (e: any) => {
    this.posX = e.changedTouches[0].clientX;
    this.posY = e.changedTouches[0].clientY;

    this.draw();
  };

  draw: () => void = () => {
    if (this.isDrawing && this.ctx) {
      this.ctx.fillStyle = "#000000";
      // this.ctx.lineWidth = 5;
      this.posX && this.posY && this.ctx.lineTo(this.posX, this.posY);
      this.ctx.stroke();
    }
  };
}

export default Paint;
