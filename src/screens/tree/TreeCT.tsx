import React, { useEffect, useState } from "react";
import Root from "utils/Root";
import TreePT from "./TreePT";

const TreeCT = () => {
  useEffect(() => {
    new Root();
  });

  return <TreePT />;
};

export default TreeCT;
