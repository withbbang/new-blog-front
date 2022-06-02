import React, { useEffect, useState } from "react";
import PaintPT from "./PaintPT";
import App from "utils/paint/App";

const PaintCT = () => {
  useEffect(() => {
    new App();
  }, []);

  return <PaintPT />;
};

export default PaintCT;
