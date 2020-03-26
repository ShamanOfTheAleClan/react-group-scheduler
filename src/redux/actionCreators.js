import * as actionTypes from "./actionTypes";

export const addDateToSchedulerAction = date => ({
   type: actionTypes.ADD_DATE,
   payload: date
});

export const removeDateFromSchedulerAction = date => ({
   type: actionTypes.REMOVE_DATE,
   payload: date
});

export const setSchedulerStatusAction = state => ({
   type: actionTypes.SET_SCHEDULER_STATUS,
   payload: state
});

export const setSchedulerAction = scheduler => ({
   type: actionTypes.SET_SCHEDULER,
   payload: scheduler
});
