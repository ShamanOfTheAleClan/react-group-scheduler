import React, { useEffect } from "react";
import { Calendar } from "../../components/Calendar/Calendar";
import { Flex } from "../../components/shared/Flex/Flex";
import Button from "../../components/shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { createSchedulerPoll } from "../../redux/actions/scheduler-actions";
import {
   getSchedulerDates,
   getUserId,
   getSchedulerVoters
} from "../../redux/selectors";
import { useState } from "react";
import { SchedulerResults } from "../../components/SchedulerResults/SchedulerResults";

export const Scheduler = () => {
   const [warningState, setWarningState] = useState(false);
   const dispatch = useDispatch();
   const selectedSchedulerDates = useSelector(getSchedulerDates);
   const user = useSelector(getUserId);
   const voters = useSelector(getSchedulerVoters);

   const didUserVote = voters.some(
      voter => voter.id == user && voter.votes.length > 0
   );

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
         {console.log(didUserVote)}
         <h2>{didUserVote ? "Poll results" : "Pick your days"}</h2>
         {didUserVote ? <SchedulerResults /> : <Calendar />}
         {warningState && <div>You must select at least 1 date</div>}
         <Button onClick={createPoll}>Accept</Button>
      </Flex>
   );
};
