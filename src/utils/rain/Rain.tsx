class Rain {
  particles: never[];
  stageWidth: number | undefined;
  stageHeight: number | undefined;
  posX: number | undefined;
  posY: number;
  speed: number;
  color: string;
  ctx: CanvasRenderingContext2D | null;
  rainWidth: number;
  rainHeight: number;
  animation: number | undefined;

  constructor(
    ctx: CanvasRenderingContext2D | null,
    stageWidth: number | undefined,
    stageHeight: number | undefined,
  ) {
    this.ctx = ctx;
    this.posX = stageWidth && this.random(0, stageWidth);
    this.posY = 0;
    this.speed = 10;
    this.color = "#87ceeb";
    this.particles = [];
    this.rainWidth = this.random(1, 5);
    this.rainHeight = this.random(this.speed, this.speed + 20);
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.update();
  }

  update: () => void = () => {
    this.createRain();
    this.clear();
    this.drop();
    requestAnimationFrame(this.update);
  };

  createRain: () => void = () => {
    if (this.ctx) {
      this.ctx.beginPath();

      if (this.posX) {
        this.ctx.moveTo(this.posX, this.posY);
        this.ctx.lineTo(this.posX, this.posY + this.rainHeight);
      }

      this.ctx.lineWidth = this.rainWidth;
      this.ctx.strokeStyle = this.color;
      this.ctx.fillStyle = this.color;

      this.ctx.stroke();
      this.ctx.closePath();
    }
  };

  clear: () => void = () => {
    this.posX &&
      this.ctx?.clearRect(
        this.posX,
        this.posY,
        this.posX + this.rainWidth,
        this.posY + this.rainHeight,
      );
  };

  drop: () => void = () => {
    if (this.stageHeight && this.stageHeight < this.posY) {
      return;
    }

    this.posY += this.speed;
  };

  createParticles: () => void = () => {};

  random: (min: number, max: number) => number = (min: number, max: number) => {
    return min + Math.floor(Math.random() * (max - min + 1));
  };
}

export default Rain;
