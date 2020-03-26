import {
   addDateToSchedulerAction,
   removeDateFromSchedulerAction,
   setSchedulerStatusAction,
   setSchedulerAction
} from "../actionCreators";
import * as constants from "../../utils/constants";

export const toggleSchedulerDate = date => (dispatch, getState) => {
   const { scheduler } = getState();
   scheduler.dates.some(e => e === date)
      ? dispatch(removeDateFromSchedulerAction(date))
      : dispatch(addDateToSchedulerAction(date));
};

export const createSchedulerPoll = e => async (dispatch, getState) => {
   const { scheduler } = getState();
   // Back-end should be configured to set scheduler.state
   // to "SCHEDULE_IN_PROGRESS" on success
   const payload = { ...scheduler, status: constants.SCHEDULE_IN_PROGRESS };

   const response = await fetch("http://localhost:3004/scheduler", {
      method: "POST",
      headers: {
         "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
   });
   if (response.status === 201) {
      dispatch(setSchedulerStatusAction(constants.SCHEDULE_IN_PROGRESS));
   }
};

export const fetchScheduler = () => async (dispatch, getState) => {
   const response = await fetch("http://localhost:3004/scheduler");
   const scheduler = await response.json();
   if (response.status === 200) {
      dispatch(setSchedulerAction(scheduler));
   }
};
