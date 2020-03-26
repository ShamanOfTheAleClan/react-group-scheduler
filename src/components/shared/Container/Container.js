import React from "react";
import c from "./Container.module.css";

export default function Container({ children, className }) {
   const { container } = c;
   const styles = [className, container];
   return <div className={styles.join(" ")}>{children}</div>;
}
