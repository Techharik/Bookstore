import {combineReducers} from 'redux';
import { UserReducer } from './user/user.reducer';
import productReducers from './product/product.reducer';


export const rootReducer = combineReducers({
    user:UserReducer,
    products: productReducers
})