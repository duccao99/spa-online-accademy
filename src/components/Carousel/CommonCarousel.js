import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  carousel_dot_css: {
    minHeight: 500,
    // overflow: "hidden",

    "& li.dot": {
      backgroundColor: "black!important",
    },
    "& div.carousel.carousel-slider": {
      overflow: "initial",
    },
    "& div.carousel.slider-wrapper": {
      overflow: "initial",
    },
    "& li.slide.selected": {
      minHeight: 400,
    },
    "& ul.control-dots": {
      bottom: 0,
    },
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
      // interval={1000}
      transitionTime={700}
      showIndicators={true}
      showThumbs={false}
      className={classes.carousel_dot_css}
    >
      {props.children}
    </Carousel>
  );
}
