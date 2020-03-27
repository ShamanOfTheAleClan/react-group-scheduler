import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserId } from "../../redux/selectors";
import Button from "../shared/Button";
import { logoutUser } from "../../redux/actions/login-actions";

export const Nav = () => {
   const history = useHistory();
   const dispatch = useDispatch();
   const user = useSelector(getUserId);
   const path = history.location.pathname;
   const logout = () => {
      dispatch(logoutUser());
   };
   return (
      <nav>
         <Link to="/">Home</Link>
         {user ? <Button onClick={logout}>Logout</Button> : null}
         {path === "/scheduler" ? <Link to="/">BACK</Link> : <>{null}</>}
      </nav>
   );
};
