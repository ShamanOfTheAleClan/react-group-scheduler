import {
   setLoggedInUserAction,
   removeLoggedInUserAction
} from "../actionCreators";
import { useHistory } from "react-router";

export const loginUser = credentials => async (dispatch, useState) => {
   // All of this needs to be redone, once back-end is implemented
   // App.js checks if localStorage contains "user" and
   // redirects to login if false
   if (!credentials) {
      window.alert("You must enter email and password");
      return;
   }
   const email = credentials.email;
   const password = credentials.password;
   const response = await fetch("http://localhost:3004/users");
   const users = await response.json();
   const credentialsOK = users.some(
      user => user.email === email && user.password === password
   );
   if (credentialsOK) {
      const { id } = users.find(user => user.email === email);
      window.localStorage.setItem("user", id);
      dispatch(setLoggedInUserAction(id));
      console.log("success");
   } else {
      window.alert("Email or password are incorrect");
   }
};

export const logoutUser = () => dispatch => {
   window.localStorage.removeItem("user");
   dispatch(removeLoggedInUserAction());
   // const history = useHistory();
   // history.push("/login");
};
