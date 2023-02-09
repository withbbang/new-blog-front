import React from "react";

const RainPT = (props: any) => (
  <>
    <div id="rain" style={{ width: "100%", height: "100%" }}></div>
    <audio autoPlay={true} loop>
      <source src={props.bgm} type="audio/mp3"></source>
    </audio>
  </>
);

export default RainPT;
