import React, { useState } from "react";
import { Flex } from "../shared/Flex/Flex";
import { CalendarGrid } from "../CalendarGrid/CalendarGrid";
import { getMonthName } from "./utils";
import Button from "../shared/Button";
import { useEffect } from "react";
import c from "./Calendar.module.css";

export const Calendar = () => {
   const [selectedMonthState, setSelectedMonthState] = useState();
   const todaysMonth = new Date().getMonth();

   useEffect(() => {
      if (!selectedMonthState && selectedMonthState !== 0)
         setSelectedMonthState(todaysMonth);
   }, []);

   const incrementMonth = () =>
      // selectedMonthState === 11
      // ? setSelectedMonthState(0)
      // :
      setSelectedMonthState(selectedMonthState + 1);
   const decrementMonth = () =>
      // selectedMonthState === 0
      // ? setSelectedMonthState(11)
      // :
      setSelectedMonthState(selectedMonthState - 1);

   return (
      <Flex flexDirection="column" alignItems="center" className={c.calendar}>
         <Flex justifyContent="center">
            <Button onClick={decrementMonth}>prev</Button>
            {(selectedMonthState || selectedMonthState === 0) && (
               <span className={c.monthHeading}>
                  {getMonthName(selectedMonthState)}
               </span>
            )}
            <Button onClick={incrementMonth}>next</Button>
         </Flex>
         <CalendarGrid month={selectedMonthState} />
      </Flex>
   );
};
