import React from "react";
import c from "./Flex.module.css";
import { flexDirectionHelper, justifyHelper, alignHelper } from "./utils";

export const Flex = ({
   className,
   children,
   flexDirection,
   justifyContent,
   alignItems,
   dataid
}) => {
   const styles = [c.flex, className];
   flexDirectionHelper(styles, flexDirection, c);
   justifyHelper(styles, justifyContent, c);
   alignHelper(styles, alignItems, c);
   return (
      <div data-id={dataid} className={styles.join(" ")}>
         {children}
      </div>
   );
};