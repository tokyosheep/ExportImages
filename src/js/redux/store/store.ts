import {combineReducers,createStore} from "redux";
import {PSReducer,LoadingState,AIReplaceReducer,AIPlacedImgs,PSModeReduce} from "../reducer/index";

const rootReducer = combineReducers({
    PSReducer,
    LoadingState,
    AIReplaceReducer,
    AIPlacedImgs,
    PSModeReduce,
});

export const configStore = () =>{
    const store = createStore(rootReducer);
    return store;
};