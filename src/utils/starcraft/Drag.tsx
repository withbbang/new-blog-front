class Drag {
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number | undefined;
  stageHeight: number | undefined;
  startMousePosX: number | undefined | null;
  startMousePosY: number | undefined | null;
  endMousePosX: number | undefined | null;
  endMousePosY: number | undefined | null;
  isDrag: boolean;
  getDragPos: (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
  ) => void;

  constructor(
    ctx: CanvasRenderingContext2D | null,
    stageWidth: number | undefined,
    stageHeight: number | undefined,
    getDragPos: (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
    ) => void,
  ) {
    this.ctx = ctx;
    this.isDrag = false;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.getDragPos = getDragPos;

    this.ctx!.strokeStyle = "rgb(32, 255, 32)";

    document.addEventListener("mousedown", this.mousedown);
    document.addEventListener("mouseup", this.mouseup);
    document.addEventListener("mousemove", this.mousemove);
    document.addEventListener("touchstart", this.touchstart);
    document.addEventListener("touchend", this.touchend);
    document.addEventListener("touchmove", this.touchmove);

    this.update();
  }

  mousedown: (e: any) => void = (e: any) => {
    this.isDrag = true;
    this.ctx?.beginPath();
    this.startMousePosX = e.offsetX;
    this.startMousePosY = e.offsetY;
    this.startMousePosX &&
      this.startMousePosY &&
      this.ctx?.moveTo(this.startMousePosX, this.startMousePosY);
  };

  mouseup: () => void = () => {
    this.isDrag = false;
    this.setDragPos();
  };

  mousemove: (e: any) => void = (e: any) => {
    this.endMousePosX = e.clientX;
    this.endMousePosY = e.clientY;
  };

  touchstart: (e: any) => void = (e: any) => {
    this.isDrag = true;
    this.ctx?.beginPath();
    this.startMousePosX = e.touches[0].clientX;
    this.startMousePosY = e.touches[0].clientY;
    this.startMousePosX &&
      this.startMousePosY &&
      this.ctx?.moveTo(this.startMousePosX, this.startMousePosY);
  };

  touchend: () => void = () => {
    document.body.style.overscrollBehaviorY = "";
    this.setDragPos();
  };

  touchmove: (e: any) => void = (e: any) => {
    document.body.style.overscrollBehaviorY = "none";
    this.endMousePosX = e.changedTouches[0].clientX;
    this.endMousePosY = e.changedTouches[0].clientY;
  };

  clear: () => void = () => {
    this.ctx &&
      this.stageWidth &&
      this.stageHeight &&
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
  };

  drag: () => void = () => {
    this.isDrag &&
      this.startMousePosX &&
      this.startMousePosY &&
      this.endMousePosX &&
      this.endMousePosY &&
      this.ctx?.strokeRect(
        this.startMousePosX,
        this.startMousePosY,
        this.endMousePosX - this.startMousePosX,
        this.endMousePosY - this.startMousePosY,
      );
  };

  update: () => void = () => {
    this.clear();
    this.drag();
    requestAnimationFrame(this.update);
  };

  setDragPos: () => void = () => {
    this.isDrag = false;
    this.startMousePosX &&
      this.startMousePosY &&
      this.endMousePosX &&
      this.endMousePosY &&
      this.getDragPos(
        this.startMousePosX,
        this.startMousePosY,
        this.endMousePosX,
        this.endMousePosY,
      );
  };
}

export default Drag;
