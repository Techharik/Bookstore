import { createStore, compose , applyMiddleware } from "redux";

import logger from 'redux-logger';
import {thunk} from 'redux-thunk';
import { rootReducer } from "./rootReducer";

//add persist
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'




const middleWares = [thunk,logger];


const persistConfig = {
    key: 'root',
    storage,
    blacklist:['user', 'products']
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

const combinedMiddleWares = compose(applyMiddleware(...middleWares))


export const store = createStore(persistedReducer,undefined,combinedMiddleWares);

export const persistor = persistStore(store)