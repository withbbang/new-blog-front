import React, { useEffect } from "react";
import StarcraftPT from "./StarcraftPT";
import App from "utils/starcraft/App";

const StarcraftCT = () => {
  useEffect(() => {
    new App();
  }, []);

  return <StarcraftPT />;
};

export default StarcraftCT;
