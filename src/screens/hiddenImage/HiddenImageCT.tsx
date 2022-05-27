import React, { useEffect, useState } from "react";
import HiddenImagePT from "./HiddenImagePT";
import App from "utils/hiddenImage/App";
import img from "assets/images/breadCharacter.png";

const HiddenImageCT = () => {
  const [imgSrc, setImgSrc] = useState(img);

  useEffect(() => {
    new App(imgSrc, setImgSrc);
  }, []);

  return <HiddenImagePT imgSrc={imgSrc} />;
};

export default HiddenImageCT;
