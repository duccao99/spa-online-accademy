import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, Paper } from '@material-ui/core';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
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
    position: 'fixed',
    zIndex: 10,
    backgroundColor: theme.palette.primary.main
  }
}));

export default function NavbarMobile() {
  const classes = useStyles();
  const [isOpenNavMobile, setIsOpenNavMobile] = useState(false);

  const openNavMobile = (e) => {
    setIsOpenNavMobile(!isOpenNavMobile);
  };

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
          <Typography variant='h6' color='inherit'>
            Online Academy
          </Typography>
        </Toolbar>
      </AppBar>

      {isOpenNavMobile ? (
        <Grid container>
          <Grid item xs={12} className={classes.paper_wrapper}>
            <Paper className={classes.nav_mobile_wrapper}></Paper>
          </Grid>
        </Grid>
      ) : (
        ''
      )}
    </div>
  );
}
