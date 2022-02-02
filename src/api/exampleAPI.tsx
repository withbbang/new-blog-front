import { put, takeEvery } from "redux-saga/effects";
import { EXAMPLE_1, EXAMPLE_2 } from "module/exampleModule";

function* ExampleSaga() {
  yield takeEvery(EXAMPLE_1.REQUEST, example_1);
  yield takeEvery(EXAMPLE_2.REQUEST, example_2);
}

function* example_1(value: any) {
  try {
    let result: Generator = yield example_1_Fetch(value.payload);

    yield put({
      type: EXAMPLE_1.SUCCESS,
      payload: {
        example_1: result,
      },
    });
  } catch (e) {
    yield put({
      type: EXAMPLE_1.FAIL,
    });
  }
}

function* example_2(value: any) {
  try {
    let result: Generator = yield example_2_Fetch(value.payload);

    yield put({
      type: EXAMPLE_2.SUCCESS,
      payload: {
        example_2: result,
      },
    });
  } catch (e) {
    yield put({
      type: EXAMPLE_2.FAIL,
    });
  }
}

const example_1_Fetch = (value: any) => {
  return new Promise((resolve, reject) => {
    try {
      // fetch("https://example.com/example_1", {
      //   method: "GET",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      // })
      //   .then((res) => {
      //     if (res.status === 400) {
      //     } else if (res.status === 200) {
      //       console.log("res", res);
      //       return res.json();
      //     }
      //   })
      //   .then((json) => {
      //     if (json) {
      //       console.log("json", json);
      //       resolve(json);
      //     }
      //   });
      setTimeout(() => resolve("success_1"), 100);
    } catch (e) {
      console.log("error", e);
      reject("error");
    }
  });
};

const example_2_Fetch = (value: any) => {
  return new Promise((resolve, reject) => {
    try {
      // fetch("https://example.com/example_2", {
      //   method: "GET",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      // })
      //   .then((res) => {
      //     if (res.status === 400) {
      //     } else if (res.status === 200) {
      //       console.log("res", res);
      //       return res.json();
      //     }
      //   })
      //   .then((json) => {
      //     if (json) {
      //       console.log("json", json);
      //       resolve(json);
      //     }
      //   });

      setTimeout(() => resolve("success_2"), 100);
    } catch (e) {
      console.log("error", e);
      reject("error");
    }
  });
};

export default ExampleSaga;
