// Selectors related to scheduler
export const getSchedulerDates = state => state.scheduler.dates;
export const getSchedulerStatus = state => state.scheduler.status;
export const getSchedulerSelectedDate = state => state.scheduler.selectedDate;
export const getSchedulerVoters = state => state.scheduler.voters;

// Selectors related to users
export const getUserId = state => state.user.id;
export const getUserRole = state => state.user.role;

// Selectors related to rooms
export const getAllRooms = state => state.rooms;
