import {
   addDateToSchedulerAction,
   removeDateFromSchedulerAction
} from "../actionCreators";

export const toggleSchedulerDate = date => (dispatch, getState) => {
   const { scheduler } = getState();
   scheduler.some(e => e === date)
      ? dispatch(removeDateFromSchedulerAction(date))
      : dispatch(addDateToSchedulerAction(date));
};
