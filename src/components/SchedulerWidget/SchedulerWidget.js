import React from "react";
import { Flex } from "../shared/Flex/Flex";
import c from "./SchedulerWidget.module.css";

export const SchedulerWidget = ({ selectedDate }) => {
   return (
      <Flex
         className={c.widget}
         flexDirection="column"
         justifyContent="center"
         alignItems="center"
      >
         <div className={c.dateHeading}>Upcoming rendezvous:</div>
         <div className={c.date}>{selectedDate}</div>
      </Flex>
   );
};
