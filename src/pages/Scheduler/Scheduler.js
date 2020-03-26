import React from "react";
import { Calendar } from "../../components/Calendar/Calendar";
import { Flex } from "../../components/shared/Flex/Flex";
import Button from "../../components/shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { createSchedulerPoll } from "../../redux/actions/scheduler-actions";
import { getSchedulerDates, getSchedulerStatus } from "../../redux/selectors";
import { useState } from "react";
import * as constants from "../../utils/constants";
import SchedulerVoting from "../../components/SchedulerVoting";
import { SchedulerResults } from "../../components/SchedulerResults/SchedulerResults";

export const Scheduler = () => {
   const [warningState, setWarningState] = useState(false);
   const dispatch = useDispatch();
   const selectedSchedulerDates = useSelector(getSchedulerDates);
   const schedulerStatus = useSelector(getSchedulerStatus);
   let header = null;
   let content = null;

   // if (userType === "GM") {
   switch (schedulerStatus) {
      case constants.SCHEDULE_NOT_CREATED:
         header = "Choose days for voting";
         content = <Calendar />;
         break;
      case constants.SCHEDULE_IN_PROGRESS:
         header = null;
         content = <SchedulerResults />;
         break;
      default:
         break;
   }
   // }
   const createPoll = () => {
      if (selectedSchedulerDates.length > 0) {
         dispatch(createSchedulerPoll());
      } else {
         setWarningState(true);
         setTimeout(() => setWarningState(false), 5000);
      }
   };
   return (
      <Flex flexDirection="column" alignItems="center">
         <h2>{header}</h2>
         {content}
         {warningState && <div>You must select at least 1 date</div>}
         <Button onClick={createPoll}>Accept</Button>
      </Flex>
   );
};
