import Drag from "./Drag";
import Unit from "./Unit";

class App {
  // 캔버스객체
  canvas: HTMLCanvasElement;
  // 캔버스 작업 객체
  ctx: CanvasRenderingContext2D | null;
  // 화면 너비
  stageWidth: number | undefined;
  // 화면 높이
  stageHeight: number | undefined;
  // 동그라미 유닛들
  units: Array<Unit>;
  // 최대 유닛 개수
  maxUnitCount: number;
  // 실제 유닛 개수
  unitCount: number;
  // 포커싱된 유닛이 하나라도 체크하기 위한 변수
  atLeastOne: number;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.style.background = "#000000";
    this.atLeastOne = 0;
    this.maxUnitCount = 10; //최대 유닛 개수 이하로 랜덤하게 출력
    // 최대 유닛 개수 내에서 랜덤하게 생성
    this.unitCount = this.random(this.maxUnitCount);

    const starcraft = document.getElementById("starcraft");
    starcraft && starcraft.appendChild(this.canvas);

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    // 유닛 드래그 생성자
    new Drag(this.ctx, this.stageWidth, this.stageHeight, this.getDragPos);
    this.units = [];

    // 실제 유닛 개수만큼 유닛 생성
    for (let i = 0; i < this.unitCount; i++) {
      this.units.push(new Unit(this.ctx, this.stageWidth, this.stageHeight));
    }
  }

  // 드래그한 시작위치, 종료위치 받아오기
  getDragPos: (
    dragStartX: number,
    dragStartY: number,
    dragEndX: number,
    dragEndY: number,
  ) => void = (
    dragStartX: number,
    dragStartY: number,
    dragEndX: number,
    dragEndY: number,
  ) => {
    const dragBigX = dragStartX > dragEndX ? dragEndX : dragStartX;
    const dragSmallX = dragStartY > dragEndY ? dragEndY : dragStartY;
    const dragBigY = dragStartX > dragEndX ? dragStartX : dragEndX;
    const dragSmallY = dragStartY > dragEndY ? dragStartY : dragEndY;
    this.units.forEach((unit) =>
      unit.setFocus(dragBigX, dragSmallX, dragBigY, dragSmallY),
    );
  };

  // 브라우져 화면 조정시 함수
  resize: () => void = () => {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    }
  };

  // 유닛 개수 설정 함수
  random: (scope: number) => number = (scope: number) =>
    Math.floor(Math.random() * (scope - 1) + 1);
}

export default App;
