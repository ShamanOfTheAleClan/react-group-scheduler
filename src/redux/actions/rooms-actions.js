import { setRoomsAction, setUserRoleAction } from "../actionCreators";

export const fetchAndSetRooms = () => async dispatch => {
   // Retrieve all rooms this user is in
   const response2 = await fetch("http://localhost:3004/rooms");
   const rooms = await response2.json();
   dispatch(setRoomsAction(rooms));
};

export const getAndSetUserRoomRole = () => (dispatch, getState) => {
   const { rooms, user } = getState();
   const room = rooms[1] || {};
   const members = room.members || [];
   const member = members.find(member => member.id == user.id) || {};
   const role = member.role;
   dispatch(setUserRoleAction(role));
};
