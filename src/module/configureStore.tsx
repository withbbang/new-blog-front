import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";

import reducer from "./index";
import sagaConfigure from "api";

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

const middlewares: Array<SagaMiddleware> = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const combine = combineReducers({ ...reducer });

let store;

if (process.env.NODE_ENV === "development") {
  store = () => {
    const store = createStore(
      combine,
      composeWithDevTools(applyMiddleware(...middlewares)),
    );
    sagaConfigure(sagaMiddleware);
    return store;
  };
} else {
  store = () => {
    const store = createStore(combine, applyMiddleware(...middlewares));
    sagaConfigure(sagaMiddleware);
    return store;
  };
}

export default store();
