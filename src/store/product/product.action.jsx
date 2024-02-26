import { getAllProducts } from "../../utils/admin.utils"
import { productActions } from "./product.action.types"



export const viewProducts = ()=> {
    return async (dispatch) =>{
        dispatch({
          type:productActions.FETCH_ALL_PRODUCTS_START
        })
         
        try{
          const data = await getAllProducts()
       
          dispatch({
            type:productActions.FETCH_ALL_PRODUCTS_SUCCESS,
            payload:data
          })
        }catch(err){
           dispatch({
            type:productActions.FETCH_ALL_PRODUCTS_FAILED,
            payload:err
           })
        }
    
}

}