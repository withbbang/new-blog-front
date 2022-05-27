import { Player } from "types";
import img from "assets/images/breadCharacter.png";

class Character {
  ctx: CanvasRenderingContext2D | null;
  character: HTMLImageElement;
  stageWidth: number | undefined;
  stageHeight: number | undefined;
  player: Player;

  constructor(
    ctx: CanvasRenderingContext2D | null,
    stageWidth: number | undefined,
    stageHeight: number | undefined,
  ) {
    this.ctx = ctx;
    this.character = document.createElement("img");
    this.character.src = img;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.player = {
      w: 100,
      h: 100,
      x: 20,
      y: 20,
      speed: 10,
      dx: 0,
      dy: 0,
    };

    document.addEventListener("keydown", this.keyDown);
    document.addEventListener("keyup", this.keyUp);

    this.update();
  }

  clear() {
    this.ctx &&
      this.stageWidth &&
      this.stageHeight &&
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
  }

  drawPlayer = () => {
    this.ctx &&
      this.ctx.drawImage(
        this.character,
        this.player.x,
        this.player.y,
        this.player.w,
        this.player.h,
      );
  };

  detectWalls = () => {
    if (this.stageWidth && this.stageHeight) {
      if (this.player.x < 0) {
        this.player.x = this.stageWidth - 20;
      }
      if (this.player.x > this.stageWidth) {
        this.player.x = 20;
      }
      if (this.player.y < 0) {
        this.player.y = this.stageHeight - 20;
      }
      if (this.player.y > this.stageHeight) {
        this.player.y = 20;
      }
    }
  };

  newPost = () => {
    this.player.x += this.player.dx;
    this.player.y += this.player.dy;
    this.detectWalls();
  };

  update = () => {
    this.clear();
    this.drawPlayer();
    this.newPost();
    requestAnimationFrame(this.update);
  };

  moveRight = () => (this.player.dx = this.player.speed);
  moveLeft = () => (this.player.dx = -this.player.speed);
  moveUp = () => (this.player.dy = -this.player.speed);
  moveDown = () => (this.player.dy = this.player.speed);

  keyDown = (e: any) => {
    if (e.key === "ArrowRight" || e.key === "Right") {
      this.moveRight();
    } else if (e.key === "ArrowLeft" || e.key === "Left") {
      this.moveLeft();
    } else if (e.key === "ArrowUp" || e.key === "Up") {
      this.moveUp();
    } else if (e.key === "ArrowDown" || e.key === "Down") {
      this.moveDown();
    }
  };

  keyUp = (e: any) => {
    if (
      e.key === "ArrowRight" ||
      e.key === "Right" ||
      e.key === "ArrowLeft" ||
      e.key === "Left"
    ) {
      this.player.dx = 0;
    } else if (
      e.key === "ArrowUp" ||
      e.key === "Up" ||
      e.key === "ArrowDown" ||
      e.key === "Down"
    ) {
      this.player.dy = 0;
    }
  };
}

export default Character;
