class Unit {
  ctx: CanvasRenderingContext2D | null;
  // 생성된 유닛 X좌표
  unitPosX: number | undefined;
  // 생성된 유닛 Y좌표
  unitPosY: number | undefined;
  // 유닛의 목적 X좌표
  desX: number | undefined;
  // 유닛의 목적 Y좌표
  desY: number | undefined;
  // 드래그돼서 포커싱된 유무값
  isFocus: boolean;
  // 유닛의 절대 움직임 속도
  speed: number;
  // X축 방향으로의 속도
  dx: number;
  // Y축 방향으로의 속도
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

  // 유닛 그리기
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

  // 우클릭 했을 시 목적좌표 및 X, Y축 각각의 속도 설정
  mouseup: (e: any) => void = (e: any) => {
    if (e.which === 3 && this.isFocus) {
      this.desX = e.clientX;
      this.desY = e.clientY;
      this.setSpeed(e.clientX, e.clientY);
    }
  };

  // 유닛의 X, Y축 각각의 속도 설정
  setSpeed: (x: number, y: number) => void = (x: number, y: number) => {
    const angle = this.getAngle(x, y);
    this.dx = this.speed * Math.cos(angle);
    this.dy = this.speed * Math.sin(angle);
  };

  // 각도 반환 함수
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

  // 유닛의 움직임을 일으키는 함수
  move: (x: number | undefined, y: number | undefined) => void = (
    x: number | undefined,
    y: number | undefined,
  ) => {
    if (this.unitPosX && this.unitPosY && x && y) {
      if (
        // 유닛이 목적좌표에 가까워 졌을 경우 움직임 멈춤
        Math.sqrt(
          Math.pow(x - this.unitPosX, 2) + Math.pow(y - this.unitPosY, 2),
        ) <= this.speed
      ) {
        this.dx = 0;
        this.dy = 0;
      }
      this.unitPosX += this.dx;
      this.unitPosY += this.dy;
    }
  };

  // 유닛이 드래그 내부에 들어왔을 경우 포커싱 설정 함수
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

  // 유닛이 포커싱 됐을 경우, 유닛 하단에 포커싱 그림 그리기
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

  // 유닛 생성 위치좌표 랜덤하게 가져오기
  randomPos: (scope: number) => number = (scope: number) =>
    Math.floor(Math.random() * (scope - 10) + 10);
}

export default Unit;
