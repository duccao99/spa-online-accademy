import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import cn from "classnames";
import React from "react";
import { Redirect, useParams } from "react-router-dom";
import CatManagement from "./CategoryManagement/CatManagement";
import InsDetail from "./InstructorManagement/InsDetail";
import InstructorManagement from "./InstructorManagement/InstructorManagement";
import StudentDetail from "./StudentManagement/StudentDetail";
import StudentManagement from "./StudentManagement/StudentManagement";
import SubCatDetail from "./SubCatDetail";
import CourseManagement from "./CoursesManagement/CourseManagement";
import CourseDetails from "./CoursesManagement/CourseDetails";
const styles = makeStyles((theme) => ({
  root: {
    "& *::-webkit-scrollbar": {
      display: "none",
      width: "1em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: `#455a64`,
      outline: "1px solid slategrey",
    },
  },
  paper: {
    padding: 32,
    textAlign: "left",
    color: theme.palette.text.secondary,
    wordBreak: "break-all;",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    "&:visited": {
      color: "inherit",
      textDecoration: "none",
    },
  },
}));

export default function AdminContent({ match }) {
  const { admin_id } = useParams();
  React.useEffect(() => {
    console.log(match);
  }, [admin_id]);
  const classes = styles();

  function renderCustom(path) {
    if (path === "/admin/cat-management") {
      return (
        <Box>
          <CatManagement />
        </Box>
      );
    } else if (path === "/admin/cat-management/subcat/:id") {
      return (
        <Box>
          <SubCatDetail />
        </Box>
      );
    } else if (path === "/admin/course-management") {
      return (
        <Box>
          <CourseManagement />
        </Box>
      );
    } else if (path === "/admin/course-management/course/:id") {
      return (
        <Box>
          {" "}
          <CourseDetails />{" "}
        </Box>
      );
    } else if (path === "/admin/student-management") {
      return (
        <Box>
          <Box mb={3}>
            <Typography variant="h6">Student management</Typography>
          </Box>
          <Box>
            <StudentManagement />
          </Box>
        </Box>
      );
    } else if (path === "/admin/student-management/student/:id") {
      return (
        <Box>
          <StudentDetail />
        </Box>
      );
    } else if (path === "/admin/instructor-management") {
      return (
        <Box>
          <InstructorManagement />
        </Box>
      );
    } else if (path === "/admin/instructor-management/instructor/:id") {
      return (
        <Box>
          <InsDetail />
        </Box>
      );
    } else {
      return (
        <Box>
          <Redirect to="/admin/course-management" />
        </Box>
      );
    }
  }

  return (
    <Paper className={cn(classes.paper, classes.root)}>
      {renderCustom(match.path)}
    </Paper>
  );
}
