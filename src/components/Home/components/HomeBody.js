import "./HomeBody.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MusicCard from "./MusicCard";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  heading: {
    color: "white",
    fontSize: "20px",
    fontWeight: "900",
  },
}));

export default function HomeBody() {
  const classes = useStyles();

  return (
    <div className="home__body">
      <div>
        <Typography className={classes.heading} variant="h6" gutterBottom>
          Top Trending
        </Typography>
      </div>
      <Grid spacing={2} container>
        <MusicCard />
      </Grid>
    </div>
  );
}
