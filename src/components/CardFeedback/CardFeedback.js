import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import React from "react";

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 140,
  },
  title: {
    color: "black",
    fontWeight: 500,
  },
  user_wrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  },
  media: {
    width: "30px",
  },
});

export default function CardFeedback({
  user_id,
  course_id,
  review_content,
  star,
  user_name,
}) {
  const classes = useStyles();
  const [rating_value, set_rating_value] = React.useState(2);
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Box className={classes.user_wrapper}>
            <img
              src="/user-icon.png"
              alt=""
              style={{ width: "30px", marginRight: "10px" }}
            />
            <Typography variant="h5" component="h3">
              {user_name}
            </Typography>
          </Box>
          <Rating value={+star} readOnly precision={0.5} />

          <Box py={1}>
            <Typography
              dangerouslySetInnerHTML={{ __html: review_content }}
            ></Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
