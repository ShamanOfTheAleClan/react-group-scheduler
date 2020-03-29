import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
   getSchedulerStatus,
   getUserRole,
   getSchedulerSelectedDate,
   getAllRooms,
   getSchedulerVoters,
   getUserId
} from "../../redux/selectors";
import Button from "../../components/shared/Button";
import * as constants from "../../utils/constants";
import { Link } from "react-router-dom";

import { fetchAndSetScheduler } from "../../redux/actions/scheduler-actions";
import { useEffect } from "react";
import {
   fetchAndSetRooms,
   getAndSetUserRoomRole
} from "../../redux/actions/rooms-actions";
import { addVoterAction } from "../../redux/actionCreators";
import { useState } from "react";
import c from "./Room.module.css";

export const Room = () => {
   const dispatch = useDispatch();
   const schedulerStatus = useSelector(getSchedulerStatus);
   const schedulerVoters = useSelector(getSchedulerVoters);
   const user = useSelector(getUserId);
   const userRole = useSelector(getUserRole);
   const selectedDate = useSelector(getSchedulerSelectedDate);
   const rooms = useSelector(getAllRooms);
   const [fetchingSchedulerState, setFetchingSchedulerState] = useState(false);

   useEffect(() => {
      if (rooms.length < 1) {
         dispatch(fetchAndSetRooms());
      }
   }, []);

   useEffect(() => {
      dispatch(getAndSetUserRoomRole());
      if (!fetchingSchedulerState) {
         setFetchingSchedulerState(true);
         dispatch(fetchAndSetScheduler());
         // setFetchingSchedulerState(false);
      }
   }, [rooms]);

   const addUserToVotersArray = () => {
      if (!schedulerVoters[user]) {
         dispatch(addVoterAction(user));
      }
   };

   // Check, what to render
   let content = null;
   switch (schedulerStatus) {
      case constants.SCHEDULE_NOT_CREATED:
         content =
            userRole === constants.GM ? (
               <Link to="/scheduler">
                  <Button>Scheduler</Button>
               </Link>
            ) : null;

         break;
      case constants.SCHEDULE_IN_PROGRESS:
         content = (
            <Link to="/scheduler">
               <Button onClick={addUserToVotersArray}>Scheduler</Button>
            </Link>
         );
         break;
      case constants.SCHEDULE_DATE_SELECTED:
         // GM should be able to click on it
         // others - not
         content = <div>{selectedDate}</div>;
         break;
      default:
         break;
   }
   return <section className={c.room}>{content}</section>;
};
