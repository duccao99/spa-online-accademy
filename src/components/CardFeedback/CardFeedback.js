import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
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
        {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user_name}
          </Typography>
          <Rating value={+star} readOnly precision={0.5} />

          <Box py={3}>
            <Typography
              dangerouslySetInnerHTML={{ __html: review_content }}
            ></Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Like
        </Button> */}
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
      </CardActions>
    </Card>
  );
}
