import exampleReducer from "./exampleModule";
import { initialStateExample } from "./exampleModule";

// api 생성시 하나씩 리듀서 추가해준다.
const reducer = {
  examples: exampleReducer,
};

export default reducer;

// api 생성시 같이 따라 생기는 타입 추가해준다.
export interface PropState {
  examples: initialStateExample;
}
