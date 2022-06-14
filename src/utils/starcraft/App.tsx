import Drag from "./Drag";
import Unit from "./Unit";

class App {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number | undefined;
  stageHeight: number | undefined;
  units: Array<Unit>;
  maxUnitCount: number;
  unitCount: number;
  atLeastOne: number;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.style.background = "#000000";
    this.atLeastOne = 0;
    this.maxUnitCount = 10; //최대 유닛 개수 이하로 랜덤하게 출력
    this.unitCount = this.random(this.maxUnitCount);

    const starcraft = document.getElementById("starcraft");
    starcraft && starcraft.appendChild(this.canvas);

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    new Drag(this.ctx, this.stageWidth, this.stageHeight, this.getDragPos);
    this.units = [];

    for (let i = 0; i < this.unitCount; i++) {
      this.units.push(new Unit(this.ctx, this.stageWidth, this.stageHeight));
    }
  }

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

  resize: () => void = () => {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    }
  };

  random: (scope: number) => number = (scope: number) =>
    Math.floor(Math.random() * (scope - 1) + 1);
}

export default App;
