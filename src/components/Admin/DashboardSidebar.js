import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  paper: {
    padding: 32,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    minHeight: '80vh'
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

export default function DashboardSidebar({ setPage }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const history = useHistory();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  const handleSignOutClick = (e) => {
    sessionStorage.removeItem('user_name');
    sessionStorage.removeItem('email');
    sessionStorage.clear();

    sessionStorage.setItem('isLogout', true);

    return history.push('/');
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <Paper className={classes.paper}>
      <MenuList>
        <Link className={classes.link} to={`/admin/cat-management`}>
          <MenuItem>Category management</MenuItem>
        </Link>
        <Link className={classes.link} to={`/admin/delete-course`}>
          <MenuItem>Delete course</MenuItem>
        </Link>
        <Link className={classes.link} to={`/admin/student-management`}>
          <MenuItem>Student management</MenuItem>
        </Link>
        <Link className={classes.link} to={`/admin/instructor-management`}>
          <MenuItem>Instructor management</MenuItem>
        </Link>
        <Link className={classes.link} to={`/`}>
          <MenuItem>Home</MenuItem>
        </Link>
        <MenuItem className={classes.btn_signout} onClick={handleSignOutClick}>
          Sign out
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
