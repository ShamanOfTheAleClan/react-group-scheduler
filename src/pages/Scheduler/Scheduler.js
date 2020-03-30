import React from "react";
import { Calendar } from "../../components/Calendar/Calendar";
import { Flex } from "../../components/shared/Flex/Flex";
import Button from "../../components/shared/Button";
import { useDispatch, useSelector } from "react-redux";
import {
   createSchedulerPoll,
   submitSchedulerVotes,
   submitSchedulerSelectedDates
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
import { setVoterStatusToTrueAction } from "../../redux/actionCreators";
import c from "./Scheduler.module.css";
import { useHistory } from "react-router";
import SchedulerDeleteModal from "../../components/SchedulerDeleteModal";
import { useEffect } from "react";

export const Scheduler = () => {
   const [warningState, setWarningState] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editingSchedule, setEditingSchedule] = useState(false);
   const dispatch = useDispatch();
   const history = useHistory();
   const selectedSchedulerDates = useSelector(getSchedulerDates);
   const user = useSelector(getUserId);
   const voters = useSelector(getSchedulerVoters);
   const schedulerStatus = useSelector(getSchedulerStatus);
   const userRole = useSelector(getUserRole);
   const selectedDate = useSelector(getSchedulerSelectedDate);

   const SCHEDULE_NOT_CREATED =
      schedulerStatus === constants.SCHEDULE_NOT_CREATED;
   const SCHEDULE_IN_PROGRESS =
      schedulerStatus === constants.SCHEDULE_IN_PROGRESS;
   const SCHEDULE_DATE_SELECTED =
      schedulerStatus === constants.SCHEDULE_DATE_SELECTED;

   useEffect(() => {
      if (
         schedulerStatus === constants.SCHEDULE_NOT_CREATED &&
         userRole !== constants.GM
      ) {
         history.push("/");
      }
   }, []);

   const didUserVote = user => {
      if (voters[user]) {
         return voters[user].voted ? true : false;
      }
   };

   const createPoll = () => {
      if (selectedSchedulerDates.length > 0) {
         dispatch(createSchedulerPoll(user));
      } else {
         setWarningState(true);
         setTimeout(() => setWarningState(false), 5000);
      }
   };

   const votePoll = () => {
      if (voters[user].votes.length > 0) {
         dispatch(setVoterStatusToTrueAction(user));
         dispatch(submitSchedulerVotes());
      } else {
         setWarningState(true);
         setTimeout(() => setWarningState(false), 5000);
      }
   };

   const submitSelectedDates = async () => {
      const { status } = await dispatch(submitSchedulerSelectedDates());
      if (status) history.push("/room");
   };

   const editSchedule = () => {
      if (editingSchedule) {
         votePoll();
      }
      toggleEditingSchedule();
   };

   const toggleDeleteWarningModal = () => setIsModalOpen(!isModalOpen);
   const toggleEditingSchedule = () => setEditingSchedule(!editingSchedule);

   return (
      <Flex
         flexDirection="column"
         alignItems="center"
         style={{ padding: "0 20px" }}
      >
         <h2>{didUserVote(user) ? "Poll results" : "Pick your days"}</h2>

         {didUserVote(user) && !editingSchedule ? (
            <SchedulerResults />
         ) : (
            <Calendar />
         )}

         {warningState && (
            <div className={c.error}>You must select at least 1 date</div>
         )}

         {SCHEDULE_NOT_CREATED && (
            <Button onClick={createPoll} text="Create poll" />
         )}

         {SCHEDULE_IN_PROGRESS && !didUserVote(user) ? (
            <Button onClick={votePoll} text="Accept" />
         ) : (
            <Button
               onClick={editSchedule}
               style={{ backgroundColor: "var(--tertiary)" }}
               text={editingSchedule ? "Save" : "Edit my votes"}
            />
         )}

         <Flex justifyContent="space-around" style={{ marginTop: "1rem" }}>
            {SCHEDULE_IN_PROGRESS && userRole === constants.GM && (
               <Button
                  onClick={submitSelectedDates}
                  className={selectedDate ? null : c.inactive}
                  text="Set final date"
               />
            )}

            {SCHEDULE_DATE_SELECTED && userRole === constants.GM && (
               <Button
                  onClick={submitSelectedDates}
                  className={selectedDate ? null : c.inactive}
                  text="Change final date"
               />
            )}
            {(SCHEDULE_IN_PROGRESS || SCHEDULE_DATE_SELECTED) &&
               userRole === constants.GM && (
                  <Button
                     onClick={toggleDeleteWarningModal}
                     style={{
                        backgroundColor: "var(--secondary)"
                     }}
                     text="Delete poll"
                  />
               )}
         </Flex>

         <SchedulerDeleteModal
            toggleModal={toggleDeleteWarningModal}
            isModalOpen={isModalOpen}
         />
      </Flex>
   );
};
