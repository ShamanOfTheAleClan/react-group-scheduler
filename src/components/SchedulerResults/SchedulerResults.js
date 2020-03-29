import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
   getSchedulerVoters,
   getUserRole,
   getAllMembersInRoom,
   getSchedulerSelectedDate
} from "../../redux/selectors";
import { useState } from "react";
import { useEffect } from "react";
import * as constants from "../../utils/constants";
import { setSchedulerSelectedDateAction } from "../../redux/actionCreators";
import c from "./SchedulerResults.module.css";

export const SchedulerResults = () => {
   const dispatch = useDispatch();
   const voters = useSelector(getSchedulerVoters);
   const userRole = useSelector(getUserRole);
   const members = useSelector(getAllMembersInRoom);
   const selectedDate = useSelector(getSchedulerSelectedDate);
   const [results, setResults] = useState([]);

   useEffect(() => {
      const fillAndOrderResults = () => {
         let resultsObject = {};
         //fill
         for (let i = 0; i < Object.keys(voters).length; i++) {
            let key = Object.keys(voters)[i];
            voters[key].votes.forEach(vote => {
               if (resultsObject[vote]) {
                  resultsObject[vote].push(voters[key].id);
               } else {
                  resultsObject[vote] = [voters[key].id];
               }
            });
         }
         //sort
         let resultsArray = [];
         for (let date in resultsObject) {
            resultsArray.push({ date: date, voters: resultsObject[date] });
         }
         resultsArray.sort((a, b) => b.voters.length - a.voters.length);
         setResults(resultsArray);
      };
      fillAndOrderResults();
   }, []);

   const setSelectedDate = e => {
      if (userRole === constants.GM) {
         dispatch(setSchedulerSelectedDateAction(e.target.dataset.id));
         console.log(selectedDate);
      }
   };

   const percentageOfVoters = date => {
      let sum = 0;
      for (let voter in voters) {
         if (voters[voter].votes.some(vote => vote === date)) {
            sum += 1;
         }
      }
      console.log((sum / members.length) * 100);
      return (sum / members.length) * 100;
   };

   return (
      <section className={c.results}>
         {results.map((item, i) => {
            return (
               <div key={item.date} className={c.pollItemWraper}>
                  <input
                     id={i}
                     type="radio"
                     name="date"
                     className={c.hidden}
                  ></input>
                  <label
                     className={c.pollItem}
                     data-id={item.date}
                     onClick={setSelectedDate}
                     htmlFor={i}
                  >
                     <div
                        className={c.filler}
                        style={{ width: `${percentageOfVoters(item.date)}%` }}
                     ></div>
                     <span className={c.text}>{item.date}</span>
                  </label>
               </div>
            );
         })}
      </section>
   );
};
