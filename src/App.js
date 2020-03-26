import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Container from "./components/shared/Container/Container";
import { routes } from "./routes";
import Nav from "./components/Nav";

function App() {
   return (
      <BrowserRouter>
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
      </BrowserRouter>
   );
}

export default App;
