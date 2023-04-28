import { Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/home";
import Movies from "./pages/Movies";
import history from "./util/history";
import Reviews from "./pages/Reviews";
import MovieDetails from "./pages/MovieDetails";

const Routes = () => {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <PrivateRoute path="/movies">
          <Route path="/movies" exact>
            <Movies />
          </Route>
          <Route path="/movies/:movieId/details" exact>
            <MovieDetails />
          </Route>
          <Route path="/movies/:movieId">
            <Reviews />
          </Route>
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
