import * as actionTypes from "../actionTypes";

export default (state = [], action) => {
   switch (action.type) {
      case actionTypes.ADD_DATE:
         return [...state, action.payload];
      case actionTypes.REMOVE_DATE:
         return [...state.filter(date => date !== action.payload)];
      default:
         return state;
   }
};
