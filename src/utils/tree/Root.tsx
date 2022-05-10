import Tree from "./Tree";

class Root {
  pixelRatio: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number | undefined;
  stageHeight: number | undefined;

  constructor() {
    // 캔버스 생성 후 랜더링
    this.canvas = document.createElement("canvas");
    this.canvas.style.background = "#000000";
    const treeTag = document.getElementById("tree");
    treeTag && treeTag.appendChild(this.canvas);

    // context 생성
    this.ctx = this.canvas.getContext("2d");
    // 레티나 디스플레이에서도 제대로 보이기 위해
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    window.addEventListener("click", this.click.bind(this), false);
    this.resize();

    // 화면 가운데에 나무 생성
    new Tree(
      this.ctx,
      this.stageWidth && this.stageWidth / 2,
      this.stageHeight,
    );
  }

  resize() {
    // body의 너비와 높이 저장
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    // 디스플레이 비율에 맞추어 캔버스 사이즈와 비율 조정
    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    if (this.ctx) {
      this.ctx.scale(this.pixelRatio, this.pixelRatio);

      // 리사이즈시 캔버스를 비워줌
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    }
  }

  click(event: { clientX: number }) {
    const { clientX } = event;
    new Tree(this.ctx, clientX, this.stageHeight);
  }
}

export default Root;
