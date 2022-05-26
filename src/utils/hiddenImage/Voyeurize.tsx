class Voyeurize {
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number | undefined;
  stageHeight: number | undefined;
  mousePosX: number | undefined;
  mousePosY: number | undefined;
  radius: number;
  count: number;

  constructor(
    ctx: CanvasRenderingContext2D | null,
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

    document.addEventListener("mousemove", this.mousemove);
    document.addEventListener("mousedown", this.mousedown);
    document.addEventListener("mouseup", this.mouseup);

    // alert(`${this.count}초 동안 누르고 있어용~`);

    this.update();
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

  update = () => {
    this.clear();
    this.voyeurize();
    requestAnimationFrame(this.update);
  };

  mousedown = (e: any) => {
    console.log("mousedown visited?");
    //TODO: FadeIn(), update 함수 주석
  };

  mouseup = (e: any) => {
    console.log("mouseup visited?");
    //TODO: FadeOut(), update 함수 주석
  };

  mousemove = (e: any) => {
    this.mousePosX = e.clientX;
    this.mousePosY = e.clientY;
  };

  random = () => {
    return Math.floor(Math.random() * (120 - 90) + 90);
  };
}

export default Voyeurize;
