import React, { useEffect, useState } from "react";
import HiddenImagePT from "./HiddenImagePT";
import App from "utils/hiddenImage/App";

const HiddenImageCT = () => {
  const [imgSrc, setImgSrc] = useState("/images/breadCharacter.png");

  useEffect(() => {
    new App(setImgSrc);
  }, []);

  return <HiddenImagePT imgSrc={imgSrc} />;
};

export default HiddenImageCT;
