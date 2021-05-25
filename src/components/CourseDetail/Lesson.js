import { Box } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, Button, Typography, Paper } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import cn from "classnames";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import VideoPreview from "../CommonVideo/VideoPreview";

import { Player, Video } from "video-react";
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
  preview: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "black",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000038",
    zIndex: 100,
  },
  video_wrapper: {
    position: "fixed",
    zIndex: 111,
    opacity: 1,
  },
  close_video_icon: {
    position: "absolute",
    top: "-10%",
    left: "110%",
    zIndex: 110,
    color: "white",
    height: 30,
    width: 30,
    "&:hover": {
      color: "black",
      cursor: "pointer",
    },
  },
  d_none: {
    display: "none",
  },
  video: {
    backgroundColor: "#8c8c8c30",
    padding: 120,
    paddingTop: 62,
    borderRadius: 5,
    "& .video-react-video": {
      // height: "200px!important",
    },
    "& .video-react": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
}));

export default function Lesson({
  open,
  chap_id,
  lesson_id,
  lesson_name,
  lesson_video_url,
  flag_reviewable,
  lesson_content,
}) {
  const classes = styles();
  const [is_close_video, set_is_close_video] = useState(true);
  const [isCloseVideo, setisCloseVideo] = useState(true);
  const [muted, setmuted] = useState(true);

  const handleCloseVideo = (e) => {
    setisCloseVideo(!isCloseVideo);
    setmuted(!muted);
  };
  const react_player_config = {
    youtube: {
      playerVars: { showinfo: 1 },
    },
  };
  return (
    <React.Fragment>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary={`${lesson_name}`} />

            {+flag_reviewable === 1 ? (
              <Button onClick={handleCloseVideo}>Preview</Button>
            ) : (
              ""
            )}
          </ListItem>
        </List>
      </Collapse>

      <Box
        className={cn(classes.preview, {
          [classes.d_none]: is_close_video === true,
        })}
      >
        <Box className={classes.video_wrapper}>
          <CloseIcon
            className={classes.close_video_icon}
            onClick={handleCloseVideo}
          />
        </Box>
      </Box>

      <Box
        component={Paper}
        className={cn(classes.video, {
          [classes.d_none]: isCloseVideo,
        })}
      >
        <Box my={3}>
          <Typography variant="h6"> {lesson_name} </Typography>
        </Box>

        <Box>
          <VideoPreview muted={muted} lesson_video_url={lesson_video_url} />
        </Box>
        <Box my={3}>
          <Typography variant="h6">Lesson content</Typography>
        </Box>

        <Box
          dangerouslySetInnerHTML={{
            __html: lesson_content,
          }}
        ></Box>
      </Box>
    </React.Fragment>
  );
}
