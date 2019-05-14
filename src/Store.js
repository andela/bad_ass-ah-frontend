//@redux store
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducers from "./reducers/index";

//@middleware
const middleware=[thunk];
const initialState={};
//@creating store
const Store= createStore(rootReducers,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default Store;


