import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import CallToActionIcon from "@material-ui/icons/CallToAction";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import React, { useEffect } from "react";
import Lesson from "./Lesson";

const common_fontsize = 18;

const styles = makeStyles((theme) => ({
  course_detail_wrapper: {},
  ava_course: {},
  section_header: {
    minHeight: 100,
    marginTop: 100,
  },
  course_name: {
    fontWeight: "bold",
  },
  course_header_title: {
    textAlign: "left",
    paddingTop: 12,
    paddingBottom: 12,
    color: "white",
  },
  section_short_des: {
    minHeight: 100,
    fontSize: common_fontsize,
  },
  des: {
    fontWeight: "bold",
  },
  section_description: {
    minHeight: 100,
    fontSize: common_fontsize,
  },
  section_syllabus: {
    minHeight: 100,
    fontSize: common_fontsize,
  },
  section_rating: {},
  section_feedback: {
    marginBottom: 16,
  },
  paper: {
    padding: 32,
    textAlign: "left",
    color: theme.palette.text.secondary,
    marginBottom: 16,
  },
  box_cat: {
    padding: 12,
    "& .MuiTypography-root": {
      fontSize: common_fontsize,
    },
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

// get lesson by chap id and it will be okay
export default function Chapter({ chap_name, chap_id, lessons }) {
  const classes = styles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <CallToActionIcon />
        </ListItemIcon>
        <ListItemText primary={chap_name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      {lessons.length === 0
        ? "Chap is not completed"
        : lessons.map((ele, i) => {
            return ele.chap_id === chap_id ? (
              <Lesson {...ele} key={i} open={open} />
            ) : (
              ""
            );
          })}
    </React.Fragment>
  );
}
