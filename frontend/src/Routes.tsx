import { Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/home";
import Movies from "./pages/Movies";
import history from "./util/history";


const Routes = () => {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <PrivateRoute path="/movie">
          <Movies />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
