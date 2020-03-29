import {
   addDateToSchedulerAction,
   removeDateFromSchedulerAction,
   setSchedulerStatusAction,
   setSchedulerAction,
   removeDateFromVotesAction,
   addDateToVotesAction
} from "../actionCreators";
import * as constants from "../../utils/constants";

export const toggleSchedulerDate = date => (dispatch, getState) => {
   const { scheduler } = getState();
   scheduler.dates.some(e => e === date)
      ? dispatch(removeDateFromSchedulerAction(date))
      : dispatch(addDateToSchedulerAction(date));
};

export const voteSchedulerDate = (date, userID) => (dispatch, getState) => {
   const { scheduler } = getState();
   const voter = scheduler.voters[userID];
   console.log(typeof date, date, ";", typeof userID, userID);
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
   if (response.status === 201) {
      console.log("Votes submited");
   }
};

export const submitSchedulerSelectedDate = () => async (dispatch, getState) => {
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
   if (response.status === 201) {
      dispatch(setSchedulerStatusAction(constants.SCHEDULE_DATE_SELECTED));
      console.log("Selected date submited");
   }
};

export const createSchedulerPoll = e => async (dispatch, getState) => {
   const { scheduler } = getState();
   // Back-end should be configured to set scheduler.state
   // to "SCHEDULE_IN_PROGRESS" on success
   const payload = { ...scheduler, status: constants.SCHEDULE_IN_PROGRESS };

   const response = await fetch("http://localhost:3004/schedulers", {
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

export const fetchAndSetScheduler = () => async (dispatch, getState) => {
   const response = await fetch(`http://localhost:3004/schedulers/3`);
   const scheduler = await response.json();
   if (response.status === 200) {
      dispatch(setSchedulerAction(scheduler));
   }
};
