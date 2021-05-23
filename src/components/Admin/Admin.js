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
import AdminContent from "./AdminContent";

const styles = makeStyles((theme) => ({
  root: {
    overflowX: "hidden",
  },
  container: {
    backgroundColor: "gray",
  },
  paper: {
    padding: 32,
    textAlign: "left",
    color: theme.palette.text.secondary,
    minHeight: 200,
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

export default function Admin({ match }) {
  const classes = styles();

  const [page, setPage] = React.useState("");

  React.useEffect(() => {}, [match]);

  return (
    <div>
      <Container>
        <Box minHeight="97vh">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <DashboardSidebar match={match} setPage={setPage} />
            </Grid>
            <Grid item xs={12} md={9}>
              <AdminContent match={match} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
