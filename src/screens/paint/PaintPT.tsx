import React from "react";
import styles from "./PaintPT.module.scss";

const PaintPT = () => (
  <div className={styles.paint} id="paint">
    <div className={styles.wrap}>
      <div className={styles.downloadBtn} id="download">
        저장하기
      </div>
      <div className={styles.clearBtn} id="clear">
        지우기
      </div>
    </div>
  </div>
);

export default PaintPT;
