import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import banner1 from "./../../assets/images/banner/1.jpg";
import banner2 from "./../../assets/images/banner/2.jpg";
import banner3 from "./../../assets/images/banner/3.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  carousel: {
    maxHeight: 401,
    overflow: "hidden",
  },
}));

export default function Banner() {
  const classes = useStyles();
  return (
    <Carousel
      showStatus={false}
      useKeyboardArrows={true}
      swipeable={true}
      showArrows={true}
      infiniteLoop={true}
      autoPlay={true}
      interval={1000}
      transitionTime={700}
      className={classes.carousel}
    >
      <div>
        <img src={banner1} />
      </div>
      <div>
        <img src={banner2} />
      </div>
      <div>
        <img src={banner3} />
      </div>
    </Carousel>
  );
}
