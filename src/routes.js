import Scheduler from "./pages/Scheduler";
import Home from "./pages/Home";

export const routes = [
   { isExact: true, component: Home, path: "/", label: "Home" },
   {
      isExact: true,
      component: Scheduler,
      path: "/scheduler",
      label: "Scheduler"
   }
];
