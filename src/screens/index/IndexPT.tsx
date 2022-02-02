import React from "react";

const IndexPT = (props: Props) => {
  return (
    <div>
      Hello, This Page Is Index Page!
      <button onClick={props.example_1}>click</button>
    </div>
  );
};

interface Props {
  example_1: () => any;
  value_1: string;
}

export default IndexPT;
