class Voyeurize {
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number | undefined;
  stageHeight: number | undefined;
  mousePosX: number | undefined;
  mousePosY: number | undefined;
  radius: number;
  count: number;
  initCount: number;
  animation: number | null;

  constructor(
    ctx: CanvasRenderingContext2D | null,
    imgSrc: string,
    stageWidth: number | undefined,
    stageHeight: number | undefined,
  ) {
    this.ctx = ctx;
    this.radius = 250;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.mousePosX = 1;
    this.mousePosY = 1;
    this.count = this.random();
    this.initCount = this.count;
    this.animation = null;

    document.addEventListener("mousemove", this.mousemove);
    document.addEventListener("mousedown", this.mousedown);
    document.addEventListener("mouseup", this.mouseup);
    document.addEventListener("touchmove", this.touchmove);
    document.addEventListener("touchstart", this.touchstart);
    document.addEventListener("touchend", this.touchend);

    this.fill();
    imgSrc && alert("꾸욱 누르고 있어용~");

    // 관음버전
    // this.update();
  }

  clear = () => {
    this.ctx &&
      this.stageWidth &&
      this.stageHeight &&
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
  };

  voyeurize: () => void = () => {
    if (
      this.ctx &&
      this.mousePosX &&
      this.mousePosY &&
      this.stageWidth &&
      this.stageHeight
    ) {
      const gradient = this.ctx.createRadialGradient(
        this.mousePosX,
        this.mousePosY,
        0,
        this.mousePosX,
        this.mousePosY,
        this.radius,
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(0.99, "rgba(0, 0, 0, 1)");

      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    }
  };

  voyeurize_: () => void = () => {
    if (
      this.ctx &&
      this.mousePosX &&
      this.mousePosY &&
      this.stageWidth &&
      this.stageHeight
    ) {
      const gradient = this.ctx.createRadialGradient(
        this.mousePosX,
        this.mousePosY,
        0,
        this.mousePosX,
        this.mousePosY,
        (this.initCount - this.count) / 10,
      );

      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(0.99, "rgba(0, 0, 0, 1)");

      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    }
  };

  update: () => void = () => {
    this.clear();
    this.voyeurize();
    requestAnimationFrame(this.update);
  };

  fill: () => void = () => {
    if (this.ctx && this.stageWidth && this.stageHeight) {
      this.ctx.fillStyle = "#000000";
      this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    }
  };

  fadeIn: () => void = () => {
    this.count -= 1;

    if (this.count < 1 && this.animation) {
      cancelAnimationFrame(this.animation);
    } else {
      this.clear();
      this.voyeurize_();
    }

    this.animation = requestAnimationFrame(this.fadeIn);
  };

  mousedown: () => void = () => {
    this.fadeIn();
  };

  mouseup: () => void = () => {
    this.animation && cancelAnimationFrame(this.animation);
    this.count = this.initCount;
    this.fill();
  };

  mousemove: (e: any) => void = (e: any) => {
    this.mousePosX = e.clientX;
    this.mousePosY = e.clientY;
  };

  touchstart: () => void = () => {
    console.log("is touch start?");
    this.fadeIn();
  };

  touchend: () => void = () => {
    console.log("is touch end?");
    this.animation && cancelAnimationFrame(this.animation);
    this.count = this.initCount;
    this.fill();
  };

  touchmove: (e: any) => void = (e: any) => {
    console.log("e.clientX: ", e.changedTouches[0].clientX);
    this.mousePosX = e.changedTouches[0].clientX;
    this.mousePosY = e.changedTouches[0].clientY;
  };

  random: () => number = () => {
    return Math.floor(Math.random() * (72000 - 54000) + 54000);
  };
}

export default Voyeurize;
