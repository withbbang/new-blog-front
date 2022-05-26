import React from "react";

const HiddenImagePT = (props: any) => (
  <div
    id="hiddenImage"
    style={{
      width: "100%",
      height: "100%",
      backgroundImage: `url(${props.imgSrc})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  ></div>
);

export default HiddenImagePT;
