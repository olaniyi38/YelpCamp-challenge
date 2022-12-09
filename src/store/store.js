import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
//import thunk from 'redux-thunk'
import createSagaMiddleWare from "redux-saga";
import { rootSaga } from "./root-saga";

const loggerMiddleWare = (next) => (action) => (state) => {
  console.log('prevState: ', state)
  console.log('action-type: ', action.type)
  console.log('payload: ',action.payload)

  next(action)

  console.log('currentState: ',state)
}

const sagaMiddleWare = createSagaMiddleWare()

const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleWare].filter(Boolean)

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose


const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(rootReducer, undefined, composedEnhancers)

sagaMiddleWare.run(rootSaga)