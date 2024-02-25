import { UserActionTypes } from "./user.action.types"

export function setUserAction(u){
  return async(dispatch)=>{
    dispatch({
  
        type:UserActionTypes.SET_USER_ACTION,
        payload:{...u}
    }
    )
   }
}