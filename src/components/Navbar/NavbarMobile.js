import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, Paper } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BrightnessAutoIcon from '@material-ui/icons/BrightnessAuto';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PublishIcon from '@material-ui/icons/Publish';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Category from '../Category/Category';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 0,
    border: `2px solid ${theme.palette.primary}`,
    padding: '0 4px'
  }
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper_wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {}
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  nav_mobile: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  nav_mobile_wrapper: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'fixed',
    zIndex: 10000,
    padding: '4vw',
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    fontSize: 20
  },
  btn_sign_in: {
    fontSize: 20,
    padding: 0,
    textTransform: 'initial'
  },
  nav_typo: {
    color: '#ffffff'
  },
  link: {
    padding: '24px 0',
    textTransform: 'initial'
  }
}));

function NavbarMobile(props) {
  const classes = useStyles();
  const [isOpenNavMobile, setIsOpenNavMobile] = useState(false);
  const [user_role, set_user_role] = useState(0);
  const [user_name, set_user_name] = useState('');
  const [email, set_email] = useState('');
  const [quantity, set_quantity] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setisLogout, cart_global_state, quantity_global_state } = props;

  const params = useParams();
  const history = useHistory();
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSignOutClick = (e) => {
    sessionStorage.removeItem('user_name');
    sessionStorage.removeItem('email');
    sessionStorage.clear();

    sessionStorage.setItem('isLogout', true);
    setisLogout(true);

    set_user_name(undefined);

    return history.push('/');
  };

  const openNavMobile = (e) => {
    setIsOpenNavMobile(!isOpenNavMobile);
  };

  useEffect(() => {
    const user_role_check = sessionStorage.getItem('user_role');
    if (user_role_check !== null) {
      set_user_role(user_role_check);
    } else {
      set_user_role(null);
    }

    const user_name = sessionStorage.getItem('user_name');
    let email = sessionStorage.getItem('email');

    if (user_name === '') {
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
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar className={classes.nav_mobile} variant='dense'>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={openNavMobile}
          >
            <MenuIcon />
          </IconButton>
          <Link to='/'>
            <Typography variant='h6' color='inherit'>
              Online Academy
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      {isOpenNavMobile ? (
        <Grid container>
          <Grid item xs={12} className={classes.paper_wrapper}>
            <Paper className={classes.nav_mobile_wrapper}>
              <Link className={classes.link} to='/courses-list'>
                <Typography variant='h6' className={classes.nav_typo}>
                  Courses list
                </Typography>
              </Link>

              {+user_role === 3 || +user_role === 4 ? (
                <Link className={classes.link} to='/instructor/upload-course'>
                  {' '}
                  <Typography variant='h6' className={classes.nav_typo}>
                    <PublishIcon className={classes.icon_courses_list} />
                    Upload-course
                  </Typography>
                </Link>
              ) : (
                ''
              )}

              {+user_role === 4 ? (
                <Link className={classes.link} to='/admin'>
                  {' '}
                  <Typography variant='h6' className={classes.nav_typo}>
                    <BrightnessAutoIcon className={classes.icon_courses_list} />
                    Admin Page
                  </Typography>
                </Link>
              ) : (
                ''
              )}

              {user_name !== undefined ? (
                <div>
                  {/* Cart */}
                  {+user_role === 2 || +user_role === 4 ? (
                    <Link to='/user/cart'>
                      <IconButton className={classes.cart_css}>
                        <StyledBadge badgeContent={quantity} color='secondary'>
                          <ShoppingCartIcon />
                        </StyledBadge>
                      </IconButton>
                    </Link>
                  ) : (
                    ''
                  )}

                  <Link className={classes.link} to='/user/profile'>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                  </Link>

                  {+user_role === 2 ? (
                    <Box>
                      <Link
                        className={classes.link}
                        to={`/user/purchased-course/${email}`}
                      >
                        <MenuItem onClick={handleClose}>
                          Purchased course
                        </MenuItem>
                      </Link>

                      <Link
                        className={classes.link}
                        to={`/user/favorite-course/${email}`}
                      >
                        <MenuItem onClick={handleClose}>
                          Favorite course
                        </MenuItem>
                      </Link>
                    </Box>
                  ) : (
                    ''
                  )}

                  {+user_role === 3 ? (
                    <Link
                      className={classes.link}
                      to={`/instructor/uploaded-course/${email}`}
                    >
                      <MenuItem onClick={handleClose}>Uploaded course</MenuItem>
                    </Link>
                  ) : (
                    ''
                  )}

                  <MenuItem
                    className={classes.btn_signout}
                    onClick={handleSignOutClick}
                  >
                    Sign out
                  </MenuItem>
                </div>
              ) : (
                <Link
                  className={classes.btn_sign_in_wrapper}
                  to='/user/sign-in'
                >
                  <Button color='inherit' className={classes.btn_sign_in}>
                    Sign in
                  </Button>
                </Link>
              )}
            </Paper>
          </Grid>
        </Grid>
      ) : (
        ''
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    cart_global_state: state.cartReducer.cart,
    quantity_global_state: state.cartReducer.quantity
  };
};

export default connect(mapStateToProps, null)(NavbarMobile);
