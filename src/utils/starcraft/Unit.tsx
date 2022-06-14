class Unit {
  ctx: CanvasRenderingContext2D | null;
  unitPosX: number | undefined;
  unitPosY: number | undefined;
  desX: number | undefined;
  desY: number | undefined;
  isFocus: boolean;
  speed: number;
  dx: number;
  dy: number;

  constructor(
    ctx: CanvasRenderingContext2D | null,
    stageWidth: number | undefined,
    stageHeight: number | undefined,
  ) {
    this.ctx = ctx;
    this.unitPosX = stageWidth && this.randomPos(stageWidth);
    this.unitPosY = stageHeight && this.randomPos(stageHeight);
    this.isFocus = false;
    this.speed = 5;
    this.dx = 0;
    this.dy = 0;

    document.addEventListener("mouseup", this.mouseup);

    this.update();
  }

  update: () => void = () => {
    this.drawUnit();
    this.drawFocus();
    this.move(this.desX, this.desY);
    requestAnimationFrame(this.update);
  };

  drawUnit: () => void = () => {
    this.ctx?.beginPath();
    if (this.unitPosX && this.unitPosY) {
      this.ctx?.arc(this.unitPosX, this.unitPosY, 10, 0, Math.PI * 2, false);
    }

    this.ctx!.fillStyle = "#FFFFFF";
    this.ctx!.strokeStyle = "#FFFFFF";

    this.ctx?.fill();
    this.ctx?.stroke();
  };

  mouseup: (e: any) => void = (e: any) => {
    if (e.which === 3 && this.isFocus) {
      this.desX = e.clientX;
      this.desY = e.clientX;
      this.setSpeed(e.clientX, e.clientY);
    }
  };

  getAngle: (x: number, y: number) => number = (x: number, y: number) => {
    let angle = 0;
    if (this.unitPosX && this.unitPosY) {
      // 라디안 반환
      angle = Math.atan2(y - this.unitPosY, x - this.unitPosX);
      // 디그리 반환시
      // angle = angle * 180 / Math.PI
    }

    return angle;
  };

  setSpeed: (x: number, y: number) => void = (x: number, y: number) => {
    const angle = this.getAngle(x, y);
    this.dx = Math.cos(angle);
    this.dy = Math.sin(angle);
  };

  move: (x: number | undefined, y: number | undefined) => void = (
    x: number | undefined,
    y: number | undefined,
  ) => {
    if (this.unitPosX && this.unitPosY && x && y) {
      if (Math.abs(x - this.unitPosX) < 1 || Math.abs(y - this.unitPosY) < 1) {
        return;
      }
      this.unitPosX += this.speed * this.dx;
      this.unitPosY += this.speed * this.dy;
    }
  };

  setFocus: (
    dragBigX: number,
    dragBigY: number,
    dragSmallX: number,
    dragSmallY: number,
  ) => void = (
    dragBigX: number,
    dragBigY: number,
    dragSmallX: number,
    dragSmallY: number,
  ) => {
    if (this.unitPosX && this.unitPosY) {
      if (
        this.unitPosX > dragBigX &&
        this.unitPosX < dragSmallX &&
        this.unitPosY > dragBigY &&
        this.unitPosY < dragSmallY
      ) {
        this.isFocus = true;
      } else {
        this.isFocus = false;
      }
    }
  };

  drawFocus: () => void = () => {
    if (this.isFocus) {
      this.ctx?.beginPath();
      if (this.unitPosX && this.unitPosY) {
        this.ctx?.ellipse(
          this.unitPosX,
          this.unitPosY + 12,
          12,
          5,
          0,
          -0.75 * Math.PI,
          1.75 * Math.PI,
          true,
        );
      }

      this.ctx!.strokeStyle = "rgb(32, 255, 32)";

      this.ctx?.stroke();
    }
  };

  randomPos: (scope: number) => number = (scope: number) =>
    Math.floor(Math.random() * (scope - 10) + 10);
}

export default Unit;
