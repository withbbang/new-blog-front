import { handleActions, Action } from "redux-actions";
import { makeAsyncActions, makeAsyncActionCreator } from "./common";

export const EXAMPLE_1 = makeAsyncActions("example/EXAMPLE_1");
export const EXAMPLE_2 = makeAsyncActions("example/EXAMPLE_2");

export const example_1 = makeAsyncActionCreator(EXAMPLE_1);
export const example_2 = makeAsyncActionCreator(EXAMPLE_2);

const initialState: initialStateExample = {
  isFetching: false,
  value_1: "",
  value_2: "",
};

export interface initialStateExample {
  isFetching: boolean;
  value_1: string;
  value_2: string;
}

const exampleReducer = handleActions(
  {
    [EXAMPLE_1.REQUEST]: (state: initialStateExample, action) => {
      return Object.assign({}, state, {
        isFetching: true,
      });
    },
    [EXAMPLE_1.SUCCESS]: (state: initialStateExample, action: Action<any>) => {
      return Object.assign({}, state, {
        isFetching: false,
        value_1: action.payload.example_1,
      });
    },
    [EXAMPLE_1.FAIL]: (state: initialStateExample, action: Action<any>) => {
      console.log("example_1 fail");
      return Object.assign({}, state, {
        isFetching: false,
      });
    },
    [EXAMPLE_2.REQUEST]: (state: initialStateExample, action: Action<any>) => {
      return Object.assign({}, state, {
        isFetching: true,
      });
    },
    [EXAMPLE_2.SUCCESS]: (state: initialStateExample, action: Action<any>) => {
      return Object.assign({}, state, {
        isFetching: false,
        value_2: action.payload.example_2,
      });
    },
    [EXAMPLE_2.FAIL]: (state: initialStateExample, action: Action<any>) => {
      console.log("example_2 fail");
      return Object.assign({}, state, {
        isFetching: false,
      });
    },
  },
  initialState,
);

export default exampleReducer;
