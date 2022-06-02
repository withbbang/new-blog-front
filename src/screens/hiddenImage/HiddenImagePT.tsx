import React from "react";
import styles from "./styles.module.scss";

const HiddenImagePT = (props: any) => (
  <div
    className={styles.hiddenImage}
    id="hiddenImage"
    style={{
      backgroundImage: `url(${props.imgSrc})`,
    }}
  ></div>
);

export default HiddenImagePT;
