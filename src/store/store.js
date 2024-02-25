import { createStore, compose , applyMiddleware } from "redux";

import logger from 'redux-logger';
import {thunk} from 'redux-thunk';
import { rootReducer } from "./rootReducer";

const middleWares = [thunk,logger];

const combinedMiddleWares = compose(applyMiddleware(...middleWares))


export const store = createStore(rootReducer,undefined,combinedMiddleWares);