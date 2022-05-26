import Voyeurize from "./Voyeurize";

class App {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  pixelRatio: number;
  stageWidth: number | undefined;
  stageHeight: number | undefined;

  constructor(setImgSrc: React.Dispatch<React.SetStateAction<string>>) {
    this.canvas = document.createElement("canvas");
    this.canvas.style.opacity = "0.999";
    const hiddenImage = document.getElementById("hiddenImage");
    hiddenImage && hiddenImage.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    let imgSrc = this.isExist(prompt("이름을 입력하세용"));
    imgSrc && setImgSrc(imgSrc);

    new Voyeurize(this.ctx, imgSrc, this.stageWidth, this.stageWidth);
  }

  resize(): void {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    if (this.ctx) {
      this.ctx.scale(this.pixelRatio, this.pixelRatio);
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    }
  }

  isExist(name: string | null): string {
    if (name)
      switch (name.trim()) {
        case "이종성":
          return "/images/jslee.jpg";
        case "박상국":
          return "/images/skpark.jpg";
        case "유소민":
          return "/images/smyoo.jpg";
        case "김범기":
          return "/images/bkkim.jpg";
        case "김현민":
          return "/images/hmkim.jpg";
        case "김나연":
          return "/images/nykim.jpg";
        case "박지연":
          return "/images/jypark.jpg";
        case "조예은":
          return "/images/yecho.png";
        default:
          alert(
            `${
              name ? name + "님" : "당신"
            }은 엽사가 없네용.\n엽사 찍힐 준비하세용.`,
          );
          return "";
      }
    else return "";
  }
}

export default App;
