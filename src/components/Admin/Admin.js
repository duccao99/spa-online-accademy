import { Box, Container, Grid, makeStyles, useTheme } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { BRING_SCROLLBAR_BACK } from "../../actionTypes/home.type";
import AdminContent from "./AdminContent";
import DashboardSidebar from "./DashboardSidebar";

// =========================
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ManagementItems from "./ManagementItems";
import NonManagementItems from "./NonMangementItems";

const drawerWidth = 240;
// =========================

function Admin({ match, bringScrollbarBack }) {
  const scrollbar_styles = {
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
  };
  const styles = makeStyles((theme) => ({
    "@global": {
      "*::-webkit-scrollbar": {
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

    root: {
      backgroundColor: "#fafafa",
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

    // =======================
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    // ====================================
  }));

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [isLoggedIn, setisLoggedIn] = React.useState(false);
  const [email, set_email] = React.useState("");

  const [user_name, set_user_name] = React.useState("");

  const scrollbar = match.path.includes("/admin") ? scrollbar_styles : {};

  const classes = styles();

  const [page, setPage] = React.useState("");

  React.useEffect(() => {
    // scrollbar
    bringScrollbarBack();

    // auth
    let user_name = sessionStorage.getItem("user_name");
    let email = sessionStorage.getItem("email");

    if (user_name === "") {
      return set_user_name(undefined);
    } else if (user_name === undefined) {
      return set_user_name(undefined);
    } else if (user_name === null) {
      return set_user_name(undefined);
    }
    user_name = user_name.substring(1, user_name.length - 1);
    email = email.substring(1, email.length - 1);

    set_user_name(user_name);
    set_email(email);
  }, [match, isLoggedIn]);

  return user_name !== undefined ? (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Welcome, admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <ManagementItems />
        <Divider />
        <List>
          <NonManagementItems />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AdminContent match={match} />
      </main>
    </div>
  ) : (
    // <div className={classes.root}>
    //   <Container>
    //     <Box minHeight='97vh'>
    //       <Grid container spacing={4}>
    //         <Grid item xs={12} md={3}>
    //           <DashboardSidebar match={match} setPage={setPage} />
    //         </Grid>
    //         <Grid item xs={12} md={9}>
    //           <AdminContent match={match} />
    //         </Grid>
    //       </Grid>
    //     </Box>
    //   </Container>
    // </div>
    <Redirect to="/" />
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    bringScrollbarBack: () => {
      return dispatch({
        type: BRING_SCROLLBAR_BACK,
        payload: true,
      });
    },
  };
};
export default connect(null, mapDispatchToProps)(Admin);
