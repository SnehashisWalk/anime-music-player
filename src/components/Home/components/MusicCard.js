import { useState } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleRoute } from "../../../actions";

const musicCardData = [
  {
    image: "./images/Fullmetal-Alchemist.jpg",
    anime: "Fullmetal-Alchemist",
    name: "Again",
  },
  {
    image: "./images/Demon-Slayer.jpg",
    anime: "Demon Slayer",
    name: "Gurenge",
  },
  {
    image: "./images/Haikyu.jpg",
    anime: "Haikyu",
    name: "Haikyu",
  },
  {
    image: "./images/My-Hero-Academia.jpg",
    anime: "My Hero Academia  ",
    name: "My Hero Academia",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    height: 300,
    padding: "10px",
    background: "#181818",
    "&:hover": {
      cursor: "pointer",
      background: "#414345",
    },
  },
  media: {
    height: "75%",
    width: " 100%",
  },
  heading: {
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
  },
  content: {
    color: "white",
    textAlign: "center",
    lineHeight: 2,
  },
}));

const MusicCard = ({ dispatch }) => {
  const [hoverActive, setHoverActive] = useState(false);

  const classes = useStyles();

  // const handleCardClick = (arg) => {
  //   console.log("arg", arg);
  //   dispatch({
  //     type: ROUTE__HANDLE,
  //     path: arg,
  //   });
  // };

  return musicCardData.map((card, i) => {
    return (
      <Grid item key={i} lg={3}>
        <Link to={`/Player`} style={{ textDecoration: "none" }}>
          <Card
            className={classes.root}
            onClick={() => {
              console.log("dispatched");
              dispatch(handleRoute(card.name));
            }}
            // onMouseEnter={(e) => {
            //   console.log(e.target.classList);
            //   if (card.name === card.name) setHoverActive(true);
            // }}
            // onMouseLeave={() => {
            //   setHoverActive(false);
            // }}
          >
            <CardMedia
              className={classes.media}
              image={card.image}
              title={card.anime}
            />
            {/* {hoverActive ? (
            <PlayCircleFilledWhiteIcon
              style={{
                background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              }}
            />
          ) : (
            ""
          )} */}
            <CardContent>
              <Typography
                variant="body2"
                className={classes.content}
                component="p"
              >
                {card.name}
              </Typography>
              <Typography
                variant="body2"
                className={classes.content}
                component="p"
              >
                {card.anime}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    );
  });
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(MusicCard);
