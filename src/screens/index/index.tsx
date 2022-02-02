import { connect } from "react-redux";
import { Action } from "redux-actions";
import { example_1, example_2 } from "module/exampleModule";
import { PropState } from "module/index";
import IndexCT from "./IndexCT";

const mapStateToProps = (state: PropState) => {
  const { examples } = state;
  return {
    isFetching: examples.isFetching,
    value_1: examples.value_1,
    value_2: examples.value_2,
  };
};

const mapDispatchToProps = (dispatch: (actionFunction: Action<any>) => any) => {
  return {
    example_1: (value: string | undefined) => {
      dispatch(example_1.request(value));
    },
    example_2: (value: string | undefined) => {
      dispatch(example_2.request(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexCT);
