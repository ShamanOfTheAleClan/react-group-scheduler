import {
   addDateToSchedulerAction,
   removeDateFromSchedulerAction,
   setSchedulerStatusAction,
   setSchedulerAction,
   removeDateFromVotesAction,
   addDateToVotesAction,
   deleteSchedulerAction,
   setVoterStatusToTrueAction
} from "../actionCreators";
import * as constants from "../../utils/constants";

export const toggleSchedulerDate = (date, userID) => (dispatch, getState) => {
   const { scheduler } = getState();
   if (scheduler.dates.some(e => e === date)) {
      dispatch(removeDateFromVotesAction({ date: date, user: userID }));
      dispatch(removeDateFromSchedulerAction(date));
   } else {
      dispatch(addDateToVotesAction({ date: date, user: userID }));
      dispatch(addDateToSchedulerAction(date));
   }
};

export const voteSchedulerDate = (date, userID) => (dispatch, getState) => {
   const { scheduler } = getState();
   const voter = scheduler.voters[userID];
   if (
      scheduler.dates.some(e => e === date) &&
      voter.votes.some(e => e === date)
   ) {
      dispatch(removeDateFromVotesAction({ date: date, user: userID }));
   }
   if (
      scheduler.dates.some(e => e === date) &&
      !voter.votes.some(e => e === date)
   ) {
      dispatch(addDateToVotesAction({ date: date, user: userID }));
   }
};

export const submitSchedulerVotes = () => async (dispatch, getState) => {
   const { scheduler } = getState();
   // This needs to be redone, once back-end is redone too.
   // Should update ONLY this voter's votes array instead
   // of whole schedulers array
   const response = await fetch("http://localhost:3004/schedulers/3", {
      method: "PUT",
      headers: {
         "Content-type": "application/json"
      },
      body: JSON.stringify(scheduler)
   });
   if (response.status === 200) {
      console.log("Votes submited");
   }
};

export const submitSchedulerSelectedDates = () => async (
   dispatch,
   getState
) => {
   const { scheduler } = getState();
   // This needs to be redone once back-end is redone too.
   // Should update ONLY selected date instead of whole
   // schedulers array
   const payload = { ...scheduler, status: constants.SCHEDULE_DATE_SELECTED };
   const response = await fetch("http://localhost:3004/schedulers/3", {
      method: "PUT",
      headers: {
         "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
   });
   if (response.status === 200) {
      dispatch(setSchedulerStatusAction(constants.SCHEDULE_DATE_SELECTED));
      return { status: true };
   }
};

export const createSchedulerPoll = user => async (dispatch, getState) => {
   dispatch(setVoterStatusToTrueAction(user));
   const { scheduler } = getState();
   // Back-end should be configured to set scheduler.state
   // to "SCHEDULE_IN_PROGRESS" on success
   const payload = { ...scheduler, status: constants.SCHEDULE_IN_PROGRESS };

   const response = await fetch("http://localhost:3004/schedulers/3", {
      method: "PUT",
      headers: {
         "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
   });
   if (response.status === 200) {
      dispatch(setSchedulerStatusAction(constants.SCHEDULE_IN_PROGRESS));
   }
};

export const fetchAndSetScheduler = () => async dispatch => {
   const response = await fetch(`http://localhost:3004/schedulers/3`);
   const scheduler = await response.json();
   if (response.status === 200) {
      dispatch(setSchedulerAction(scheduler));
   }
};

export const deleteScheduler = () => async dispatch => {
   const response = await fetch("http://localhost:3004/schedulers/3", {
      method: "PUT",
      headers: {
         "Content-type": "application/json"
      }
   });
   if (response.status === 200) {
      dispatch(deleteSchedulerAction());
      return { status: true };
   }
};
