class Drag {
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number | undefined;
  stageHeight: number | undefined;
  dragStartX: number | undefined | null;
  dragStartY: number | undefined | null;
  dragEndX: number | undefined | null;
  dragEndY: number | undefined | null;
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

    document.addEventListener("mousedown", this.mousedown);
    document.addEventListener("mouseup", this.mouseup);
    document.addEventListener("mousemove", this.mousemove);
    document.addEventListener("touchstart", this.touchstart);
    document.addEventListener("touchend", this.touchend);
    document.addEventListener("touchmove", this.touchmove);

    this.update();
  }

  mousedown: (e: any) => void = (e: any) => {
    if (e.which === 1) {
      this.isDrag = true;
      this.ctx?.beginPath();
      this.dragStartX = e.offsetX;
      this.dragStartY = e.offsetY;
      this.dragStartX &&
        this.dragStartY &&
        this.ctx?.moveTo(this.dragStartX, this.dragStartY);
    }
  };

  mouseup: (e: any) => void = (e: any) => {
    if (e.which === 1) {
      this.isDrag = false;
      this.setDragPos();
    }
  };

  mousemove: (e: any) => void = (e: any) => {
    this.dragEndX = e.clientX;
    this.dragEndY = e.clientY;
  };

  touchstart: (e: any) => void = (e: any) => {
    this.isDrag = true;
    this.ctx?.beginPath();
    this.dragStartX = e.touches[0].clientX;
    this.dragStartY = e.touches[0].clientY;
    this.dragStartX &&
      this.dragStartY &&
      this.ctx?.moveTo(this.dragStartX, this.dragStartY);
  };

  touchend: () => void = () => {
    document.body.style.overscrollBehaviorY = "";
    this.setDragPos();
  };

  touchmove: (e: any) => void = (e: any) => {
    document.body.style.overscrollBehaviorY = "none";
    this.dragEndX = e.changedTouches[0].clientX;
    this.dragEndY = e.changedTouches[0].clientY;
  };

  clear: () => void = () => {
    this.ctx &&
      this.stageWidth &&
      this.stageHeight &&
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
  };

  drag: () => void = () => {
    this.ctx!.strokeStyle = "rgb(32, 255, 32)";
    this.isDrag &&
      this.dragStartX &&
      this.dragStartY &&
      this.dragEndX &&
      this.dragEndY &&
      this.ctx?.strokeRect(
        this.dragStartX,
        this.dragStartY,
        this.dragEndX - this.dragStartX,
        this.dragEndY - this.dragStartY,
      );
  };

  update: () => void = () => {
    this.clear();
    this.drag();
    requestAnimationFrame(this.update);
  };

  setDragPos: () => void = () => {
    this.isDrag = false;
    this.dragStartX &&
      this.dragStartY &&
      this.dragEndX &&
      this.dragEndY &&
      this.getDragPos(
        this.dragStartX,
        this.dragStartY,
        this.dragEndX,
        this.dragEndY,
      );
  };
}

export default Drag;
