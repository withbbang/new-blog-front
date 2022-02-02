import { SagaMiddleware } from "redux-saga";
import ExampleSaga from "./exampleAPI";

function sagaConfigure(sagaMiddleware: SagaMiddleware) {
  sagaMiddleware.run(ExampleSaga);
}

export default sagaConfigure;
