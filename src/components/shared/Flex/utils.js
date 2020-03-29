/**
 *
 * Sets flex-direction css attribute via class addition
 *
 * @param {Array} styles - Array containing all provided classes
 * @param {Object} c - classes. Imported from Flex.module.css
 * @param {String} flexDirection - If left undefined returns "row"
 */

const flexDirectionHelper = (styles, flexDirection, c) => {
   switch (flexDirection) {
      case "column":
         styles.push(c.directionColumn);
         break;
      case undefined:
      case "row":
         styles.push(c.directionRow);
         break;
      default:
         throw new Error("Wrong flexDirection parameter given");
   }
};

/**
 *
 * Sets justify-content css attribute via class addition
 *
 * @param {Array} styles - Array containing all provided classes
 * @param {Object} c - classes. Imported from Flex.module.css
 * @param {String} justifyContent - If left undefined returns "flexStart"
 */
const justifyHelper = (styles, justifyContent, c) => {
   switch (justifyContent) {
      case undefined:
      case "flexStart":
         styles.push(c.justifyFlexStart);
         break;
      case "center":
         styles.push(c.justifyCenter);
         break;
      case "space-between":
         styles.push(c.justifySpaceBetween);
         break;
      default:
         throw new Error("Wrong justifyContent parameter given");
   }
};

/**
 *
 * Sets align-items css attribute via class addition
 *
 * @param {Array} styles - Array containing all provided classes
 * @param {Object} c - classes. Imported from Flex.module.css
 * @param {String} alignItems - If left undefined returns "flexStart"
 */
const alignHelper = (styles, alignItems, c) => {
   switch (alignItems) {
      case undefined:
      case "flexStart":
         styles.push(c.alignCenter);
         break;
      case "center":
         styles.push(c.alignCenter);
         break;
      default:
         throw new Error("Wrong alignItems parameter given");
   }
};

export { flexDirectionHelper, justifyHelper, alignHelper };
