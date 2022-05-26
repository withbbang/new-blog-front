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

  voyeurize = () => {
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

  voyeurize_ = () => {
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

  update = () => {
    this.clear();
    this.voyeurize();
    requestAnimationFrame(this.update);
  };

  fill = () => {
    if (this.ctx && this.stageWidth && this.stageHeight) {
      this.ctx.fillStyle = "#000000";
      this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);
    }
  };

  fadeIn = () => {
    this.count -= 1;
    console.log("count: ", this.count);

    if (this.count < 1 && this.animation) {
      cancelAnimationFrame(this.animation);
    } else {
      this.clear();
      this.voyeurize_();
    }

    this.animation = requestAnimationFrame(this.fadeIn);
  };

  mousedown = (e: any) => {
    this.fadeIn();
  };

  mouseup = (e: any) => {
    this.animation && cancelAnimationFrame(this.animation);
    this.count = this.initCount;
    this.fill();
  };

  mousemove = (e: any) => {
    this.mousePosX = e.clientX;
    this.mousePosY = e.clientY;
  };

  random = () => {
    return Math.floor(Math.random() * (72000 - 54000) + 54000);
  };
}

export default Voyeurize;
