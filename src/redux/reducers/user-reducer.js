import * as actionTypes from "../actionTypes";

const initialState = { id: null };

export default (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.SET_USER_ID:
         return { ...state, id: action.payload };
      case actionTypes.SET_USER_ROLE:
         return { ...state, role: action.payload };
      case actionTypes.REMOVE_USER:
         return initialState;
      default:
         return state;
   }
};
