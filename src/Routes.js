import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AnimePlayer from "./components/Home/AnimePlayer";
import Player from "./components/Player/Player";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Player} />
        <Route path="/Player" exact component={AnimePlayer} />
      </Switch>
    </Router>
  );
};

export default Routes;
