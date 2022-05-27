import Voyeurize from "./Voyeurize";
import jslee from "assets/images/jslee.jpg";
import skpark from "assets/images/skpark.jpg";
import smyoo from "assets/images/smyoo.jpg";
import bkkim from "assets/images/bkkim.jpg";
import hmkim from "assets/images/hmkim.jpg";
import nykim from "assets/images/nykim.jpg";
import jypark from "assets/images/jypark.jpg";
import yecho from "assets/images/yecho.png";

class App {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number | undefined;
  stageHeight: number | undefined;
  initImgSrc: string;

  constructor(
    initImgSrc: string,
    setImgSrc: React.Dispatch<React.SetStateAction<string>>,
  ) {
    this.initImgSrc = initImgSrc;
    this.canvas = document.createElement("canvas");
    this.canvas.style.opacity = "0.999";
    const hiddenImage = document.getElementById("hiddenImage");
    hiddenImage && hiddenImage.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    let imgSrc = this.isExist(prompt("이름을 입력하세용"));

    new Voyeurize(
      this.ctx,
      initImgSrc,
      imgSrc,
      setImgSrc,
      this.stageWidth,
      this.stageHeight,
    );
  }

  resize(): void {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    }
  }

  isExist(name: string | null): string {
    if (name)
      switch (name.trim()) {
        case "이종성":
          return jslee;
        case "박상국":
          return skpark;
        case "유소민":
          return smyoo;
        case "김범기":
          return bkkim;
        case "김현민":
          return hmkim;
        case "김나연":
          return nykim;
        case "박지연":
          return jypark;
        case "조예은":
          return yecho;
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
