import React, { useEffect } from "react";
import RainPT from "./RainPT";
import App from "utils/rain/App";

const RainCT = () => {
  useEffect(() => {
    new App();
  }, []);

  return <RainPT />;
};

export default RainCT;
