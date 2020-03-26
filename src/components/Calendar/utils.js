/**
 * Converts month number into a string name.
 * Starts with January being 0
 *
 * @param {Number} month
 */
export const getMonthName = month => {
   const todaysYear = new Date().getFullYear();
   const realMonth = new Date(todaysYear, month).getMonth();
   switch (realMonth) {
      case 0:
         return "January";
      case 1:
         return "February";
      case 2:
         return "March";
      case 3:
         return "April";
      case 4:
         return "May";
      case 5:
         return "June";
      case 6:
         return "July";
      case 7:
         return "August";
      case 8:
         return "September";
      case 9:
         return "October";
      case 10:
         return "November";
      case 11:
         return "December";
      default:
         throw new Error(
            `Unexpected input provided. Provided ${typeof month}. Required a Number`
         );
   }
};
