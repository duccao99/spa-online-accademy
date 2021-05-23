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
import SubCatDetail from "./SubCatDetail";

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
        <Box>
          <Box mb={3}>
            <Typography variant="h6">Category management</Typography>
          </Box>
          <Box>
            <CatManagement />
          </Box>
        </Box>
      );
    } else if (path === "/admin/cat-management/subcat/:id") {
      return (
        <Box>
          <SubCatDetail />
        </Box>
      );
    } else if (path === "/admin/delete-course") {
      return (
        <Box>
          <Box mb={3}>
            <Typography variant="h6">Delete course</Typography>
          </Box>
          <Box>
            <DeleteCourse />
          </Box>
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
    } else if (path === "/admin/instructor-management") {
      return <InstructorManagement />;
    } else {
      return (
        <Box>
          <Box mb={3}>
            <Typography variant="h6">Admin content</Typography>
          </Box>
          <Box>
            <DeleteCourse />
          </Box>
        </Box>
      );
    }
  }

  return <Paper className={classes.paper}>{renderCustom(match.path)}</Paper>;
}
