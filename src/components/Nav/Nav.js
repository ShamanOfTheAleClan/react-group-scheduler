import React from "react";
import { useHistory, Link } from "react-router-dom";

export const Nav = () => {
   const history = useHistory();
   const path = history.location.pathname;
   return (
      <nav>
         {path === "/scheduler" ? <Link to="/">BACK</Link> : <>{null}</>}
      </nav>
   );
};
