import React from "react";
import { Calendar } from "../../components/Calendar/Calendar";
import { Flex } from "../../components/shared/Flex/Flex";
import Button from "../../components/shared/Button";
import { useDispatch, useSelector } from "react-redux";
import {
   createSchedulerPoll,
   submitSchedulerVotes,
   submitSchedulerSelectedDate
} from "../../redux/actions/scheduler-actions";
import {
   getSchedulerDates,
   getUserId,
   getSchedulerVoters,
   getSchedulerStatus,
   getUserRole,
   getSchedulerSelectedDate
} from "../../redux/selectors";
import { useState } from "react";
import { SchedulerResults } from "../../components/SchedulerResults/SchedulerResults";
import * as constants from "../../utils/constants";
import { setVoterStatusToTrue } from "../../redux/actionCreators";
import c from "./Scheduler.module.css";

export const Scheduler = () => {
   const [warningState, setWarningState] = useState(false);
   const dispatch = useDispatch();
   const selectedSchedulerDates = useSelector(getSchedulerDates);
   const user = useSelector(getUserId);
   const voters = useSelector(getSchedulerVoters);
   const schedulerStatus = useSelector(getSchedulerStatus);
   const userRole = useSelector(getUserRole);
   const selectedDate = useSelector(getSchedulerSelectedDate);

   const didUserVote = voters[user].voted;

   const createPoll = () => {
      if (selectedSchedulerDates.length > 0) {
         dispatch(createSchedulerPoll());
      } else {
         setWarningState(true);
         setTimeout(() => setWarningState(false), 5000);
      }
   };

   const votePoll = () => {
      if (voters[user].votes.length > 0) {
         dispatch(setVoterStatusToTrue(user));
         dispatch(submitSchedulerVotes());
      } else {
         setWarningState(true);
         setTimeout(() => setWarningState(false), 5000);
      }
   };

   const submitSelectedDate = () => {
      dispatch(submitSchedulerSelectedDate());
   };

   return (
      <Flex flexDirection="column" alignItems="center">
         <h2>{didUserVote ? "Poll results" : "Pick your days"}</h2>

         {didUserVote ? <SchedulerResults /> : <Calendar />}

         {warningState && <div>You must select at least 1 date</div>}

         {schedulerStatus === constants.SCHEDULE_NOT_CREATED && (
            <Button onClick={createPoll}>Accept</Button>
         )}

         {schedulerStatus === constants.SCHEDULE_IN_PROGRESS &&
            !didUserVote && <Button onClick={votePoll}>Accept</Button>}

         {schedulerStatus === constants.SCHEDULE_IN_PROGRESS &&
            userRole === constants.GM && (
               <Button
                  onClick={submitSelectedDate}
                  className={selectedDate ? null : c.inactive}
               >
                  Set final date
               </Button>
            )}
      </Flex>
   );
};
