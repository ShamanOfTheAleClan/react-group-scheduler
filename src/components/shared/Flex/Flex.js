import React from "react";
import c from "./Flex.module.css";
import { flexDirectionHelper, justifyHelper, alignHelper } from "./utils";

export const Flex = ({
   className,
   children,
   onClick,
   flexDirection,
   justifyContent,
   alignItems,
   dataid,
   style
}) => {
   const styles = [c.flex, className];
   flexDirectionHelper(styles, flexDirection, c);
   justifyHelper(styles, justifyContent, c);
   alignHelper(styles, alignItems, c);
   return (
      <div
         style={style}
         onClick={onClick}
         data-id={dataid}
         className={styles.join(" ")}
      >
         {children}
      </div>
   );
};
