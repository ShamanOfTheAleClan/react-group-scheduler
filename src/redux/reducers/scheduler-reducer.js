import * as actionTypes from "../actionTypes";
import * as constants from "../../utils/constants";

const initialState = {
   dates: [],
   status: constants.SCHEDULE_NOT_CREATED,
   voters: { undefined: { votes: [] } }
};

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
            voters: {
               ...state.voters,
               [action.payload]: { id: action.payload, votes: [] }
            }
         };
      case actionTypes.ADD_VOTE:
         return {
            ...state,
            voters: {
               ...state.voters,
               [action.payload.user]: {
                  ...state.voters[action.payload.user],
                  votes: [
                     ...state.voters[action.payload.user].votes,
                     action.payload.date
                  ]
               }
            }
         };
      case actionTypes.REMOVE_VOTE:
         return {
            ...state,
            voters: {
               ...state.voters,
               [action.payload.user]: {
                  ...state.voters[action.payload.user],
                  votes: state.voters[action.payload.user].votes.filter(
                     vote => vote !== action.payload.date
                  )
               }
            }
         };
      case actionTypes.SET_VOTER_STATUS_TO_TRUE:
         return {
            ...state,
            voters: {
               ...state.voters,
               [action.payload]: {
                  ...state.voters[action.payload],
                  voted: true
               }
            }
         };
      case actionTypes.SET_SELECTED_DATE:
         return {
            ...state,
            selectedDate: action.payload
         };
      case actionTypes.DELETE_SCHEDULER:
         return { ...initialState, status: constants.SCHEDULE_NOT_CREATED };
      default:
         return state;
   }
};
