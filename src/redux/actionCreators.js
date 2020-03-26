import * as actionTypes from "./actionTypes";

export const addDateToSchedulerAction = date => ({
   type: actionTypes.ADD_DATE,
   payload: date
});

export const removeDateFromSchedulerAction = date => ({
   type: actionTypes.REMOVE_DATE,
   payload: date
});
