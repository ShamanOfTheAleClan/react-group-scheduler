import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "../shared/Button";
import { logoutUser } from "../../redux/actions/login-actions";
import c from "./Nav.module.css";
import { Flex } from "../shared/Flex/Flex";

export const Nav = () => {
   const history = useHistory();
   const dispatch = useDispatch();
   const logout = () => {
      dispatch(logoutUser());
      history.push("/login");
   };
   return (
      <Flex className={c.nav} justifyContent="space-between">
         <Link to="/room">
            <Button>Room</Button>
         </Link>
         <Button onClick={logout}>Logout</Button>
      </Flex>
   );
};
