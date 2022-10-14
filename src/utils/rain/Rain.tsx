import Particles from "./Particles";

class Rain {
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
  particles: Array<Particles>;

  constructor(
    ctx: CanvasRenderingContext2D | null,
    stageWidth: number | undefined,
    stageHeight: number | undefined,
  ) {
    this.ctx = ctx;
    this.posX = stageWidth && this.random(0, stageWidth);
    this.posY = 0;
    this.speed = this.random(15, 20);
    this.color = "#87ceeb";
    this.particles = [];
    this.rainWidth = this.random(2, 4);
    this.rainHeight = this.random(5, 10);
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.particles = [];

    this.update();
    this.createParticles();
  }

  update: () => void = () => {
    this.createRain();
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

  drop: () => void = () => {
    if (this.stageHeight && this.stageHeight < this.posY) {
      this.posY = 0;
    } else {
      this.posY += this.speed;
    }
  };

  createParticles: () => void = () => {
    const direction = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
    direction.forEach((drt) => {
      this.particles.push(
        new Particles(
          this.ctx,
          this.stageWidth,
          this.stageHeight,
          this.posX,
          this.color,
          this.speed,
          this.rainWidth,
          drt,
        ),
      );
    });
  };

  random: (min: number, max: number) => number = (min: number, max: number) => {
    return min + Math.floor(Math.random() * (max - min + 1));
  };
}

export default Rain;
