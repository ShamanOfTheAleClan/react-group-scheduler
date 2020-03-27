import * as actionTypes from "../actionTypes";

const initialState = { dates: [], status: null };

export default (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.ADD_DATE:
         return { ...state, dates: [...state.dates, action.payload] };
      case actionTypes.REMOVE_DATE:
         return {
            ...state,
            dates: state.dates.filter(date => date !== action.payload)
         };
      case actionTypes.SET_SCHEDULER_STATUS:
         return {
            ...state,
            status: action.payload
         };
      case actionTypes.SET_SCHEDULER:
         return { ...action.payload };
      case actionTypes.ADD_VOTER:
         return {
            ...state,
            voters: [...state.voters, { id: action.payload, votes: [] }]
         };
      default:
         return state;
   }
};
