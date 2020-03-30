import React from "react";
import Button from "../../components/shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/login-actions";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { getUserId } from "../../redux/selectors";
import c from "./Login.module.css";
import { Flex } from "../../components/shared/Flex/Flex";

export const Login = () => {
   const dispatch = useDispatch();
   const history = useHistory();
   const user = useSelector(getUserId);
   const [credentialsState, setCredentialsState] = useState();
   const [errorMessage, setErrorMessage] = useState(null);
   const updateEmail = e => {
      setCredentialsState({ ...credentialsState, email: e.target.value });
   };
   const updatePassword = e => {
      setCredentialsState({ ...credentialsState, password: e.target.value });
   };
   const login = async e => {
      e.preventDefault();
      // redo login when implementing decent back-end
      const { status, message } = await dispatch(loginUser(credentialsState));
      console.log(status, message);
      setErrorMessage(null);
      if (!status) {
         setErrorMessage(message);
      }
   };
   useEffect(() => {
      if (user) history.push("/home");
   }, [user]);
   return (
      <form onSubmit={login}>
         <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: "3rem" }}
         >
            {errorMessage && <div>{errorMessage}</div>}
            <input
               type="email"
               className={c.input}
               placeholder="Email"
               onChange={updateEmail}
            />
            <input
               type="password"
               className={c.input}
               placeholder="Password"
               onChange={updatePassword}
            />
            <Button style={{ marginTop: "1rem" }}>Enter Tavern</Button>
         </Flex>
      </form>
   );
};
