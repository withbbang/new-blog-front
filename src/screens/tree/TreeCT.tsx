import React, { useEffect } from "react";
import TreePT from "./TreePT";
import Root from "utils/tree/Root";

const TreeCT = () => {
  useEffect(() => {
    new Root();
  }, []);

  return <TreePT />;
};

export default TreeCT;
