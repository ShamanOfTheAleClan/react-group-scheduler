import React from "react";
import { Calendar } from "../../components/Calendar/Calendar";
import { Flex } from "../../components/shared/Flex/Flex";

export const Scheduler = () => {
   return (
      <Flex flexDirection="column" alignItems="center">
         <h2>Choose days for voting</h2>
         <Calendar />
         <button>Accept</button>
      </Flex>
   );
};
