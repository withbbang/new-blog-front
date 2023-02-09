declare module "*.MP3";
declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}
