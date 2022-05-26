import React, { useEffect } from "react";
import HiddenImagePT from "./HiddenImagePT";
import App from "utils/hiddenImage/App";

const HiddenImageCT = () => {
  useEffect(() => {
    new App();
  }, []);

  return <HiddenImagePT />;
};

export default HiddenImageCT;
