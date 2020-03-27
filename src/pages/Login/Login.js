import React from "react";
import Button from "../../components/shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/login-actions";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { getUserId } from "../../redux/selectors";

export const Login = () => {
   const dispatch = useDispatch();
   const history = useHistory();
   const user = useSelector(getUserId);
   const [credentialsState, setCredentialsState] = useState();
   const updateEmail = e => {
      setCredentialsState({ ...credentialsState, email: e.target.value });
   };
   const updatePassword = e => {
      setCredentialsState({ ...credentialsState, password: e.target.value });
   };
   const login = e => {
      e.preventDefault();
      // redo login when implementing decent back-end
      dispatch(loginUser(credentialsState));
   };
   useEffect(() => {
      if (user) history.push("/home");
   }, [user]);
   return (
      <div>
         <form onSubmit={login}>
            <input
               type="email"
               className="input"
               placeholder="Email"
               onChange={updateEmail}
            />
            <input
               type="password"
               className="input"
               placeholder="Password"
               onChange={updatePassword}
            />
            <Button>Login</Button>
         </form>
      </div>
   );
};
