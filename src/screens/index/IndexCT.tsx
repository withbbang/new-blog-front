import React, { useEffect } from "react";
import IndexPT from "./IndexPT";

const IndexCT = (props: any) => {
  useEffect(() => {
    console.log("Index Component Rendered!");
  }, []);

  return <IndexPT value_1={props.value_1} example_1={props.example_1} />;
};

export default IndexCT;
