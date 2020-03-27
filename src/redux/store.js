import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import schedulerReducer from "./reducers/scheduler-reducer";
import userReducer from "./reducers/user-reducer";
import roomsReducer from "./reducers/rooms-reducer";

const rootReducer = combineReducers({
   scheduler: schedulerReducer,
   user: userReducer,
   rooms: roomsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
   rootReducer,
   composeEnhancers(applyMiddleware(thunk))
);

export default store;
