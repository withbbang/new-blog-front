import React, { useEffect } from "react";
import RainPT from "./RainPT";
import App from "utils/rain/App";
import bgm from "assets/mp3/rain_sound.MP3";

const RainCT = () => {
  useEffect(() => {
    new App();
  }, []);

  return <RainPT bgm={bgm} />;
};

export default RainCT;
