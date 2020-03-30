import React from "react";
import Modal from "react-modal";
import c from "./SchedulerDeleteModal.module.css";
import Button from "../shared/Button";
import { Flex } from "../shared/Flex/Flex";
import { useDispatch } from "react-redux";
import { deleteScheduler } from "../../redux/actions/scheduler-actions";
import { useHistory } from "react-router";

export const SchedulerDeleteModal = ({ isModalOpen, toggleModal }) => {
   const dispatch = useDispatch();
   const history = useHistory();

   const callDeleteScheduler = async () => {
      const { status } = await dispatch(deleteScheduler());
      if (status) history.push("/");
   };
   return (
      <Modal
         isOpen={isModalOpen}
         ariaHideApp={false}
         onRequestClose={toggleModal}
         className={c.warning}
         overlayClassName={c.warningOverlay}
         shouldCloseOnOverlayClick={false}
      >
         <h2 className={c.heading}>
            Are you sure you want to delete this poll?
         </h2>
         <Flex justifyContent="space-around">
            <Button
               style={{ backgroundColor: "var(--secondary)" }}
               onClick={callDeleteScheduler}
            >
               Delete
            </Button>
            <Button
               style={{ backgroundColor: "var(--tertiary)" }}
               onClick={toggleModal}
            >
               Keep it
            </Button>
         </Flex>
      </Modal>
   );
};
