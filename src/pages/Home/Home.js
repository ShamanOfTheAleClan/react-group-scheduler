import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAndSetRooms } from "../../redux/actions/rooms-actions";
import { Link } from "react-router-dom";
import { getAllRooms } from "../../redux/selectors";

export const Home = () => {
   const dispatch = useDispatch();
   const rooms = useSelector(getAllRooms);
   useEffect(() => {
      if (rooms.length < 1) {
         dispatch(fetchAndSetRooms());
      }
   }, []);
   return (
      <div>
         <Link to="/room">Room</Link>
      </div>
   );
};
