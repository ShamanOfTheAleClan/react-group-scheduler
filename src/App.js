import React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Container from "./components/shared/Container/Container";
import { routes } from "./routes";
import Nav from "./components/Nav";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInUserAction } from "./redux/actionCreators";
import { getUserId } from "./redux/selectors";

function App() {
   const history = useHistory();
   const dispatch = useDispatch();
   const user = useSelector(getUserId);

   useEffect(() => {
      if (
         !localStorage.getItem("user") &&
         history.location.pathname !== "/login"
      ) {
         history.push("/login");
      } else {
         const id = localStorage.getItem("user");
         dispatch(setLoggedInUserAction(id));
      }
   }, [user]);
   return (
      <Container>
         <Nav />
         <main>
            <Switch>
               {routes.map((route, index) => (
                  <Route
                     key={index}
                     path={route.path}
                     component={() => <route.component />}
                     exact={route.isExact}
                  />
               ))}
               <Redirect from="*" to="/" />
            </Switch>
         </main>
      </Container>
   );
}

export default App;
