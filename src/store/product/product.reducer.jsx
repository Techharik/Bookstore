import { productActions } from "./product.action.types";



const initialState = {
    isLoading:false,
    productsData:[],
    isError:null,
}


const productReducers = (state=initialState,action={})=>{
    const {type , payload} = action;

    switch(type){
        case productActions.FETCH_ALL_PRODUCTS_START:
            return {
                ...state,
                isLoading:true,
                isError: null,
            }
        case productActions.FETCH_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading:false,
                productsData:payload,
                isError: null
            }
        case productActions.FETCH_ALL_PRODUCTS_FAILED:
            return{
                ...state,
                isLoading:false,
                isError:payload
            }
        
        default:
            return state
    }
}

export default productReducers;