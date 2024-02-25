import { UserActionTypes } from "./user.action.types";




const InitialValue = {
    userDetails:{}
}

export const UserReducer = (state =InitialValue, action={})=>{
    const {type , payload} = action;
    switch(type){
        case UserActionTypes.SET_USER_ACTION:
            return {...state,userDetails:payload}
        
        default:
           return state
    }


}