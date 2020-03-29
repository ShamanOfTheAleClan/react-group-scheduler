import React from "react";
import c from "./CalendarGrid.module.css";
import { Flex } from "../shared/Flex/Flex";
import { mapMonth } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import {
   toggleSchedulerDate,
   voteSchedulerDate
} from "../../redux/actions/scheduler-actions";
import {
   getSchedulerDates,
   getUserRole,
   getUserId,
   getSchedulerVoters
} from "../../redux/selectors";
import * as constants from "../../utils/constants";

export const CalendarGrid = ({ month }) => {
   const dispatch = useDispatch();
   const scheduler = useSelector(getSchedulerDates);
   const voters = useSelector(getSchedulerVoters);
   const userRole = useSelector(getUserRole);
   const user = useSelector(getUserId);

   const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
   // GM can toggle schedules dates anytime
   const selectDay = e => {
      switch (userRole) {
         case constants.GM:
            dispatch(toggleSchedulerDate(e.target.dataset.id));
            break;
         case constants.PLAYER:
            console.log(e.target);
            dispatch(voteSchedulerDate(e.target.dataset.id, user));
            break;
         default:
            break;
      }
   };
   // PLAYER can only vote on scheduler. onClick put dates
   // to scheduler -> voters
   return (
      <div className={c.grid}>
         {weekdays.map((e, i) => (
            <Flex
               key={i}
               className={c.heading}
               justifyContent="center"
               alignItems="center"
            >
               {e}
            </Flex>
         ))}
         {mapMonth(month).map((e, i) => (
            <Flex
               key={i}
               dataid={e.date}
               className={[
                  c.gridItem,
                  e.currentMonth && c.black,
                  userRole === constants.GM &&
                     scheduler.some(date => date === e.date) &&
                     c.selected,
                  userRole === constants.PLAYER &&
                     scheduler.some(date => date === e.date) &&
                     c.available,
                  userRole === constants.PLAYER &&
                     voters[user].votes.some(date => date === e.date) &&
                     c.selected
               ].join(" ")}
               justifyContent="center"
               alignItems="center"
               onClick={selectDay}
            >
               {e.dayOfTheMonth}
            </Flex>
         ))}
      </div>
   );
};
