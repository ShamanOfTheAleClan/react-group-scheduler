import React, { useState } from "react";
import { Flex } from "../shared/Flex/Flex";
import { CalendarGrid } from "../shared/CalendarGrid/CalendarGrid";
import { getMonthName } from "./utils";

export const Calendar = () => {
   const [selectedMonthState, setSelectedMonthState] = useState();
   const todaysMonth = new Date().getMonth();
   if (!selectedMonthState && selectedMonthState !== 0)
      setSelectedMonthState(todaysMonth);

   const incrementMonth = () => setSelectedMonthState(selectedMonthState + 1);
   const decrementMonth = () => setSelectedMonthState(selectedMonthState - 1);

   return (
      <Flex flexDirection="column" alignItems="center">
         <Flex justifyContent="center">
            <button onClick={decrementMonth}>prev</button>
            {(selectedMonthState || selectedMonthState === 0) && (
               <span>{getMonthName(selectedMonthState)}</span>
            )}
            <button onClick={incrementMonth}>next</button>
         </Flex>
         {<CalendarGrid month={selectedMonthState} />}
      </Flex>
   );
};
