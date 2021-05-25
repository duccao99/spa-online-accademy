import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Category from "../Category/Category";
import NavbarMobile from "./NavbarMobile";
import PublishIcon from "@material-ui/icons/Publish";
import BrightnessAutoIcon from "@material-ui/icons/BrightnessAuto";
const common_spacing = 32;

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
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
  nav_root: {
    "& a": {
      textDecoration: "none",
      color: "inherit",
    },
    "& a:hover": {
      textDecoration: "none",
      color: "inherit",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    [theme.breakpoints.between("md", "lg")]: {
      display: "flex",
    },
  },
  nav_mobi: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
    },
    [theme.breakpoints.down("md")]: {
      display: "flex",
    },
    [theme.breakpoints.between("md", "lg")]: {
      display: "none",
    },
  },

  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 8px rgb(0 1 1 / 10%)",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "flex",
  },

  btn_sign_in: {
    color: "inherit",
    fontSize: 16,
    textDecoration: "none",
    textTransform: "capitalize",
    "&:visited": {
      color: "inherit",
      textDecoration: "none",
    },
  },
  ten_most_newest_courses: {
    textAlign: "center",
    marginTop: common_spacing,
    marginBottom: common_spacing,
  },
  outstanding_courses: {
    textAlign: "center",
    marginTop: common_spacing,
    marginBottom: common_spacing,
  },
  card_wrapper: {
    // marginBottom: common_spacing * 2,
  },
  nav_typo: {
    margin: 12,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
  btn_si: {
    textTransform: "capitalize",
  },
  outstanding_course_wrapper: {
    marginTop: 100,
    marginBottom: 100,
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    "&:visited": {
      color: "inherit",
      textDecoration: "none",
    },
  },
  btn: {
    textTransform: "capitalize",
  },
  btn_signout: {
    textTransform: "capitalize",
    textAlign: "left",
  },
  cart_css: {
    color: "white",
  },
  header: {
    marginTop: 50,
    marginBottom: 100,
  },
  icon_courses_list: {
    marginRight: 6,
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 0,
    border: `2px solid ${theme.palette.primary}`,
    padding: "0 4px",
  },
}))(Badge);

function Navbar(props) {
  const { setisLogout, cart_global_state, quantity_global_state } = props;
  const classes = useStyles();
  const [user_name, set_user_name] = useState("");
  const [email, set_email] = useState("");
  const [user_role, set_user_role] = useState(0);
  const params = useParams();
  const history = useHistory();

  const [update, setUpdate] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [quantity, set_quantity] = useState(0);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignOutClick = (e) => {
    sessionStorage.removeItem("user_name");
    sessionStorage.removeItem("email");
    sessionStorage.clear();

    sessionStorage.setItem("isLogout", true);
    setisLogout(true);

    set_user_name(undefined);

    return history.push("/");
  };

  useEffect(() => {
    // check role
    const user_role_check = sessionStorage.getItem("user_role");

    if (user_role_check !== null) {
      set_user_role(user_role_check);
    } else {
      set_user_role(null);
    }

    // get global cart

    set_quantity(quantity_global_state);

    const user_name = sessionStorage.getItem("user_name");
    let email = sessionStorage.getItem("email");

    if (user_name === "") {
      return set_user_name(undefined);
    }

    if (user_name === undefined) {
      return set_user_name(undefined);
    }

    if (user_name === null) {
      return set_user_name(undefined);
    }

    email = email.substring(1, email.length - 1);

    set_user_name(user_name);
    set_email(email);
  }, [user_name, quantity, quantity_global_state]);
  return (
    <React.Fragment>
      <CssBaseline />
      <Box className={classes.nav_mobi}>
        <NavbarMobile />
      </Box>
      <AppBar position="static" className={classes.nav_root}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            {/* <MenuIcon /> */}
          </IconButton>

          <Box className={classes.title}>
            <Link className={classes.link} to="/">
              <Typography variant="h6" className={classes.nav_typo}>
                Online Academy
              </Typography>
            </Link>
            {/* category */}
            <Typography variant="h6" className={classes.nav_typo}>
              <Category />
            </Typography>
            {/* courses list */}
            <Link className={classes.link} to="/courses-list">
              {" "}
              <Typography variant="h6" className={classes.nav_typo}>
                <ListAltIcon className={classes.icon_courses_list} />
                Courses list
              </Typography>
            </Link>

            {+user_role === 3 || +user_role === 4 ? (
              <Link className={classes.link} to="/instructor/upload-course">
                {" "}
                <Typography variant="h6" className={classes.nav_typo}>
                  <PublishIcon className={classes.icon_courses_list} />
                  Upload-course
                </Typography>
              </Link>
            ) : (
              ""
            )}

            {+user_role === 4 ? (
              <Link className={classes.link} to="/admin">
                {" "}
                <Typography variant="h6" className={classes.nav_typo}>
                  <BrightnessAutoIcon className={classes.icon_courses_list} />
                  Admin Page
                </Typography>
              </Link>
            ) : (
              ""
            )}
          </Box>

          {user_name !== undefined ? (
            <div>
              {/* Cart */}
              {+user_role === 2 || +user_role === 4 ? (
                <Link to="/user/cart">
                  <IconButton className={classes.cart_css}>
                    <StyledBadge badgeContent={quantity} color="secondary">
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </IconButton>
                </Link>
              ) : (
                ""
              )}
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <Link className={classes.link} to="/user/profile">
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>

                {+user_role === 2 ? (
                  <Link
                    className={classes.link}
                    to={`/user/purchased-course/${email}`}
                  >
                    <MenuItem onClick={handleClose}>Purchased course</MenuItem>
                  </Link>
                ) : (
                  ""
                )}

                {+user_role === 3 ? (
                  <Link
                    className={classes.link}
                    to={`/instructor/uploaded-course/${email}`}
                  >
                    <MenuItem onClick={handleClose}>Uploaded course</MenuItem>
                  </Link>
                ) : (
                  ""
                )}

                <MenuItem
                  className={classes.btn_signout}
                  onClick={handleSignOutClick}
                >
                  Sign out
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link className={classes.btn_sign_in} to="/user/sign-in">
              <Button color="inherit" className={classes.btn_si}>
                Sign in
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    cart_global_state: state.cartReducer.cart,
    quantity_global_state: state.cartReducer.quantity,
  };
};

export default connect(mapStateToProps, null)(Navbar);
