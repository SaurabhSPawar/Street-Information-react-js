import changeTheUserState from "./userDetails";
import { combineReducers } from "redux";

const rootReducer = combineReducers( {
    changeTheUserState: changeTheUserState
} )

export default rootReducer;