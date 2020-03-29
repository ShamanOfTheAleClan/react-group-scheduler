import React from "react";
import c from "./Button.module.css";

export const Button = ({ children, onClick, className }) => {
   const styles = [c.button, className].join(" ");
   return (
      <button className={styles} onClick={onClick}>
         {children}
      </button>
   );
};
