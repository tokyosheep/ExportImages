import {combineReducers,createStore} from "redux";
import {PSReducer,AIReplaceReducer,AIPlacedImgs,PSModeReduce} from "../reducer/index";

const rootReducer = combineReducers({
    PSReducer,
    AIReplaceReducer,
    AIPlacedImgs,
    PSModeReduce,
});

export const configStore = () =>{
    const store = createStore(rootReducer);
    return store;
};