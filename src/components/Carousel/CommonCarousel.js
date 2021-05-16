import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  carousel: {
    maxHeight: 401,
    overflow: "hidden",
  },
}));

export default function CommonCarousel(props) {
  const classes = useStyles();
  return (
    <Carousel
      showStatus={false}
      useKeyboardArrows={true}
      swipeable={true}
      showArrows={true}
      interval={1000}
      transitionTime={700}
      showIndicators={true}
      showThumbs={false}
      className={classes.carousel}
    >
      {props.children}
    </Carousel>
  );
}
