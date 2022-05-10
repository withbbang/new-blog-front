import React, { useEffect, useState } from "react";
import Root from "utils/tree/Root";
import TreePT from "./TreePT";

const TreeCT = () => {
  useEffect(() => {
    new Root();
  });

  return <TreePT />;
};

export default TreeCT;
