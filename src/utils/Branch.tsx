class Branch {
  startX: number | undefined;
  startY: number | undefined;
  endX: number | undefined;
  endY: number | undefined;
  color: string;
  lineWidth: number;
  frame: number;
  cntFrame: number;
  gapX: number | undefined;
  gapY: number | undefined;
  currentX: number | undefined;
  currentY: number | undefined;

  constructor(
    startX: number | undefined,
    startY: number | undefined,
    endX: number | undefined,
    endY: number | undefined,
    lineWidth: number,
  ) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.color = "#000000";
    this.lineWidth = lineWidth;
    this.frame = 10; // 가지를 100등분으로 나누기 위한 변수 frame 선언
    this.cntFrame = 0; // 현재 frame

    // 가지의 길이를 frame으로 나누어 구간별 길이를 구함
    this.gapX =
      this.endX && this.startX && (this.endX - this.startX) / this.frame;
    this.gapY =
      this.endY && this.startY && (this.endY - this.startY) / this.frame;

    // 구간별 가지가 그려질 때 끝 좌표
    this.currentX = this.startX;
    this.currentY = this.startY;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // 가지를 다 그리면 true 리턴
    if (this.cntFrame === this.frame) return true;

    ctx.beginPath();

    // 구간별 길이를 더해주어 다음 구간의 끝 좌표를 구함
    if (this.currentX && this.gapX) this.currentX += this.gapX;
    if (this.currentY && this.gapY) this.currentY += this.gapY;

    this.startX && this.startY && ctx.moveTo(this.startX, this.startY); // 선의 시작 위치 지정
    this.currentX && this.currentY && ctx.lineTo(this.currentX, this.currentY); // 선의 끝 위치 지정

    if (this.lineWidth < 3) {
      ctx.lineWidth = 0.5;
    } else if (this.lineWidth < 7) {
      ctx.lineWidth = this.lineWidth * 0.7;
    } else if (this.lineWidth < 10) {
      ctx.lineWidth = this.lineWidth * 0.9;
    } else {
      ctx.lineWidth = this.lineWidth;
    }

    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;

    ctx.stroke();
    ctx.closePath();

    this.cntFrame++; // 현재 프레임수 증가

    // 다 안그렸으면 false를 리턴
    return false;
  }
}

export default Branch;
