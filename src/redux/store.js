import schedulerReducer from "./reducers/scheduler-reducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
   scheduler: schedulerReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
