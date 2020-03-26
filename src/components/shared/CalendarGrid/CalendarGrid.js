import React from "react";
import c from "./CalendarGrid.module.css";
import { Flex } from "../Flex/Flex";
import { mapMonth } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { toggleSchedulerDate } from "../../../redux/actions/scheduler-actions";
import { getSchedulerDates } from "../../../redux/selectors";

export const CalendarGrid = ({ month }) => {
   const dispatch = useDispatch();
   const calendar = useSelector(getSchedulerDates);

   const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
   const selectDay = e => dispatch(toggleSchedulerDate(e.target.dataset.id));
   return (
      <div className={c.grid} onClick={selectDay}>
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
                  calendar.some(date => date === e.date) && c.selected
               ].join(" ")}
               justifyContent="center"
               alignItems="center"
            >
               {e.dayOfTheMonth}
            </Flex>
         ))}
      </div>
   );
};
