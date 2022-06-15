class Drag {
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number | undefined;
  stageHeight: number | undefined;
  // 드래그 시작 X좌표
  dragStartX: number | undefined | null;
  // 드래그 시작 Y좌표
  dragStartY: number | undefined | null;
  // 드래그 종료 X좌표
  dragEndX: number | undefined | null;
  // 드래그 종료 Y좌표
  dragEndY: number | undefined | null;
  // 드래그 중인지 여부 변수
  isDrag: boolean;
  // 드래그 좌표값 넘기는 함수
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

  // 마우스 클릭시 드래그 여부 설정 및 드래그 그림 그리기 시작
  mousedown: (e: any) => void = (e: any) => {
    if (e.which === 1) {
      this.isDrag = true;
      this.ctx?.beginPath();
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;
      this.dragStartX &&
        this.dragStartY &&
        this.ctx?.moveTo(this.dragStartX, this.dragStartY);
    }
  };

  // 마우스 클릭 종료시 드래그 여부 설정 및 드래그 좌표 넘기기
  mouseup: (e: any) => void = (e: any) => {
    if (e.which === 1) {
      this.isDrag = false;
      this.setDragPos();
    }
  };

  // 드래그 하면서 마우스 옮길 시 드래그 그림을 유지하기 위한 함수
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

  // 연속성을 보이기 위해 캔버스를 계속 지움
  clear: () => void = () => {
    this.ctx &&
      this.stageWidth &&
      this.stageHeight &&
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
  };

  // 드래그 그리기
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

  // 드래그 좌표값 넘기기
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
