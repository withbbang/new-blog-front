class Particles {
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number | undefined;
  stageHeight: number | undefined;
  posX: number | undefined;
  posY: number | undefined;
  speed: number;
  color: string;
  radius: number;
  dx: number;
  dy: number;
  direction: string;

  constructor(
    ctx: CanvasRenderingContext2D | null,
    stageWidth: number | undefined,
    stageHeight: number | undefined,
    posX: number | undefined,
    color: string,
    speed: number,
    rainWidth: number,
    direction: string,
  ) {
    this.ctx = ctx;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.posX = posX;
    this.posY = stageHeight;
    this.color = color;
    this.speed = speed / 1.5;
    this.radius = rainWidth / 2;
    this.dx = 0;
    this.dy = 0;
    this.direction = direction;
  }

  update: () => void = () => {
    this.drawParticles();
  };

  drawParticles: () => void = () => {
    this.ctx?.beginPath();
    if (this.posX && this.posY) {
      this.ctx?.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    }

    this.ctx!.fillStyle = this.color;
    this.ctx!.strokeStyle = this.color;

    this.ctx?.fill();
    this.ctx?.stroke();
  };

  setSpeed: () => void = () => {
    switch (this.direction) {
      case "topLeft":
        this.dx = -this.speed / 2;
        this.dy = (-this.speed * Math.sqrt(3)) / 2;
        break;
      case "topRight":
        this.dx = this.speed / 2;
        this.dy = (-this.speed * Math.sqrt(3)) / 2;
        break;
      case "bottomLeft":
        this.dx = (-this.speed * Math.sqrt(3)) / 2;
        this.dy = -this.speed / 2;
        break;
      case "bottomRight":
        this.dx = (this.speed * Math.sqrt(3)) / 2;
        this.dy = -this.speed / 2;
        break;
      default:
        break;
    }
  };

  move: () => void = () => {};
}

export default Particles;
