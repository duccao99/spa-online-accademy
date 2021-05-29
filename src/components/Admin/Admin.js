import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { BRING_SCROLLBAR_BACK } from '../../actionTypes/home.type';
import AdminContent from './AdminContent';
import DashboardSidebar from './DashboardSidebar';

function Admin({ match, bringScrollbarBack }) {
  const scrollbar_styles = {
    '& *::-webkit-scrollbar': {
      display: 'none',
      width: '1em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: `#455a64`,
      outline: '1px solid slategrey'
    }
  };
  const styles = makeStyles((theme) => ({
    '@global': {
      '*::-webkit-scrollbar': {
        display: 'none',
        width: '1em'
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: `#455a64`,
        outline: '1px solid slategrey'
      }
    },

    root: {
      backgroundColor: '#fafafa'
    },
    container: {
      backgroundColor: 'gray'
    },
    paper: {
      padding: 32,
      textAlign: 'left',
      color: theme.palette.text.secondary,
      minHeight: 200
    },
    link: {
      color: 'inherit',
      textDecoration: 'none',
      '&:visited': {
        color: 'inherit',
        textDecoration: 'none'
      }
    }
  }));

  const [isLoggedIn, setisLoggedIn] = React.useState(false);
  const [email, set_email] = React.useState('');

  const [user_name, set_user_name] = React.useState('');

  const scrollbar = match.path.includes('/admin') ? scrollbar_styles : {};

  const classes = styles();

  const [page, setPage] = React.useState('');

  React.useEffect(() => {
    // scrollbar
    bringScrollbarBack();

    // auth
    let user_name = sessionStorage.getItem('user_name');
    let email = sessionStorage.getItem('email');

    if (user_name === '') {
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
      <Container>
        <Box minHeight='97vh'>
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
  ) : (
    <Redirect to='/' />
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    bringScrollbarBack: () => {
      return dispatch({
        type: BRING_SCROLLBAR_BACK,
        payload: true
      });
    }
  };
};
export default connect(null, mapDispatchToProps)(Admin);
