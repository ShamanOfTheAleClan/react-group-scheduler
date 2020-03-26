import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSchedulerStatus } from "../../redux/selectors";
import Button from "../../components/shared/Button";
import * as constants from "../../utils/constants";
import { Link } from "react-router-dom";
import { setSchedulerStatusAction } from "../../redux/actionCreators";
import { fetchScheduler } from "../../redux/actions/scheduler-actions";
import { useEffect } from "react";

export const Home = () => {
   const schedulerState = useSelector(getSchedulerStatus);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchScheduler());
   }, []);

   if (!schedulerState)
      dispatch(setSchedulerStatusAction(constants.SCHEDULE_NOT_CREATED));

   let content = null;
   switch (schedulerState) {
      case constants.SCHEDULE_NOT_CREATED:
         content = (
            <Link to="/scheduler">
               <Button>Create scheduler poll</Button>
            </Link>
         );
         break;
      case constants.SCHEDULE_IN_PROGRESS:
         content = (
            <Link to="/scheduler">
               <Button>Vote for date</Button>
            </Link>
         );
         break;
      case constants.SCHEDULE_DATE_SELECTED:
         content = <div>Upcoming meet</div>;
         break;
      default:
         break;
   }
   return content;
};
