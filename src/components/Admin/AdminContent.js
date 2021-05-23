import React from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  makeStyles,
  Paper,
} from "@material-ui/core";
import DashboardSidebar from "./DashboardSidebar";
import { useParams, useHistory } from "react-router-dom";
import CatManagement from "./CatManagement";
import DeleteCourse from "./DeleteCourse";
import InstructorManagement from "./InstructorManagement";
import StudentManagement from "./StudentManagement";

const styles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: 32,
    textAlign: "left",
    color: theme.palette.text.secondary,
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
        <div>
          <CatManagement />
        </div>
      );
    } else if (path === "/admin/delete-course") {
      return <DeleteCourse />;
    } else if (path === "/admin/student-management") {
      return <StudentManagement />;
    } else if (path === "/admin/instructor-management") {
      return <InstructorManagement />;
    }
  }

  return <Paper className={classes.paper}>{renderCustom(match.path)}</Paper>;
}
