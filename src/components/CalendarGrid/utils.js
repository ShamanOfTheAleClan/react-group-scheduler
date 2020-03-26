/**
 * Maps 42 indexes size array with provided month's days,
 * adding previous and next months' days to fill gaps.
 *
 * @param {Number} currentMonth
 */

export const mapMonth = currentMonth => {
   const todaysYear = new Date().getFullYear();
   let mappedMonth = [];
   const date = (day = 1) => new Date(todaysYear, currentMonth, day);
   const rawDayOfTheWeek = date().getDay();
   // convert day of the week so that first day of the week is Monday
   const dayOfTheWeek = rawDayOfTheWeek === 0 ? 6 : rawDayOfTheWeek - 1;

   // --- Add previous month's days
   const numberOfPreviousMonthDaysToShow = dayOfTheWeek;
   for (let i = numberOfPreviousMonthDaysToShow; i > 0; i--) {
      mappedMonth.push({
         date: date(1 - i).toDateString(),
         dayOfTheMonth: date(1 - i).getDate(),
         currentMonth: false
      });
   }

   // --- Add current and next month's days
   for (let i = 1; i <= 42 - numberOfPreviousMonthDaysToShow; i++) {
      mappedMonth.push({
         date: date(i).toDateString(),
         dayOfTheMonth: date(i).getDate(),
         currentMonth: date(i).getMonth() === currentMonth
      });
   }
   return mappedMonth;
};
