import { BrowserRouter, Route, Switch, useParams  } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Personaje from "./components/Personaje";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/dashboard">
          <Navbar/>
          <Dashboard/>
        </Route>
        <Route path="/Personaje/:idpersonaje">
          <Navbar/>
          <Personaje/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;