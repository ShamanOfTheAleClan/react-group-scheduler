import schedulerReducer from "./reducers/scheduler-reducer";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
   scheduler: schedulerReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(thunk))
);

export default store;
