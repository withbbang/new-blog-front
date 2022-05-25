import React, { useEffect } from "react";
import MovingCharacterPT from "./MovingCharacterPT";
import App from "utils/movingCharacter/App";

const MovingCharacterCT = () => {
  useEffect(() => {
    new App();
  }, []);

  return <MovingCharacterPT />;
};

export default MovingCharacterCT;
