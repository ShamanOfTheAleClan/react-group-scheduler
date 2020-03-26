import React from "react";
import c from "./Button.module.css";

export const Button = ({ children, onClick }) => {
   return (
      <button className={c.button} onClick={onClick}>
         {children}
      </button>
   );
};
