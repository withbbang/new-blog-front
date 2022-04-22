import React from "react";
import Particles from "react-tsparticles";
import { ParticleBasicBackground, particleCatBackground } from "./Particle";

const BackgroundPT = () => (
  <div>
    {/* <div className=""> */}
    <Particles options={particleCatBackground} />
  </div>
);

export default BackgroundPT;
