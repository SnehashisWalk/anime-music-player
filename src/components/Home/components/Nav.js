import "./Nav.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    // background: "linear-gradient(45deg, #00bf8f, #001510)",
    background: "rgba(38, 38, 38, 0.4)",
  },
  button: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    backgroundColor: "white",
    borderRadius: 50,
    border: 0,
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    fontWeight: "bold",
  },
}));

const Nav = withRouter(({ history }) => {
  const classes = useStyles();

  const handlePlayerBack = () => {
    history.goBack();
  };

  const handlePlayerForward = () => {
    history.goForward();
  };

  return (
    <div className={classes.root}>
      <AppBar classes={{ root: classes.appbar }} position="static">
        <Toolbar className="nav__header">
          <div className="nav__header__left">
            <ArrowBackIosIcon
              className="player__nav__btn"
              onClick={handlePlayerBack}
            />

            <ArrowForwardIosIcon
              className="player__nav__btn"
              onClick={handlePlayerForward}
            />
          </div>
          <div className="nav__header__right">
            <Button
              style={{
                marginRight: "10px",
                letterSpacing: "3px",
                fontWeight: "bold",
              }}
              color="inherit"
            >
              SIGN UP
            </Button>
            <Button
              style={{ marginRight: "10px", letterSpacing: "3px" }}
              classes={{ root: classes.button }}
            >
              LOG IN
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
});

export default Nav;
