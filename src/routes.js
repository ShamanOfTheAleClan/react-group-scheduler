import Scheduler from "./pages/Scheduler";
import Room from "./pages/Room";
import Login from "./pages/Login";
import Home from "./pages/Home";

export const routes = [
   { isExact: true, component: Home, path: "/", label: "Home" },
   { isExact: false, component: Room, path: "/room", label: "Room" },
   {
      isExact: true,
      component: Scheduler,
      path: "/scheduler",
      label: "Scheduler"
   },
   { isExact: true, component: Login, path: "/login", label: "Login" }
];
