import * as actionTypes from "./actionTypes";

export const addDateToSchedulerAction = date => ({
   type: actionTypes.ADD_DATE,
   payload: date
});

export const removeDateFromSchedulerAction = date => ({
   type: actionTypes.REMOVE_DATE,
   payload: date
});

export const addDateToVotesAction = ({ date, user }) => ({
   type: actionTypes.ADD_VOTE,
   payload: { date, user }
});

export const removeDateFromVotesAction = ({ date, user }) => ({
   type: actionTypes.REMOVE_VOTE,
   payload: { date, user }
});

export const setSchedulerStatusAction = state => ({
   type: actionTypes.SET_SCHEDULER_STATUS,
   payload: state
});

export const setSchedulerSelectedDateAction = date => ({
   type: actionTypes.SET_SELECTED_DATE,
   payload: date
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

export const setVoterStatusToTrueAction = voter => ({
   type: actionTypes.SET_VOTER_STATUS_TO_TRUE,
   payload: voter
});

export const deleteSchedulerAction = () => ({
   type: actionTypes.DELETE_SCHEDULER
});
