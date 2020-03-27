import * as actionTypes from "../actionTypes";

const initialState = [];

export default (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.SET_ROOMS:
         // return action.payload;
         return action.payload.reduce(
            (result, item) => ({
               ...result,
               [item.id]: item
            }),
            {}
         );
      default:
         return state;
   }
};
