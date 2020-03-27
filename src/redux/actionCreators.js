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

export const setLoggedInUserAction = userID => ({
   type: actionTypes.SET_USER_ID,
   payload: userID
});

export const removeLoggedInUserAction = () => ({
   type: actionTypes.REMOVE_USER
});

export const setUserRoleAction = role => ({
   type: actionTypes.SET_USER_ROLE,
   payload: role
});

export const setRoomsAction = rooms => ({
   type: actionTypes.SET_ROOMS,
   payload: rooms
});

export const addVoterAction = voter => ({
   type: actionTypes.ADD_VOTER,
   payload: voter
});
