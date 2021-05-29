import { Button, FormControl, TextField } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React from 'react';
import * as env from '../../config/env.config';
import { swal2Timing } from '../../config/swal2.config';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function AddInsModal({
  open,
  setOpen,
  setisComponentUpdate,
  isComponentUpdate
}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [username, setusername] = React.useState('');
  const [maile, setmaile] = React.useState('');
  const [password, setpassword] = React.useState('');

  const config = {};
  // const [open, setOpen] = React.useState(false);
  const handleClose = (e) => {
    setOpen(false);
  };

  const handlePassworChange = (e) => {
    setpassword(e.target.value);
  };
  const handleMaileChange = (e) => {
    setmaile(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setusername(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.which === 13) {
      handleAddIns(e);
    }
  };

  const handleAddIns = (e, name) => {
    e.preventDefault();
    const add_ins_url = `${env.DEV_URL}/api/instructor`;
    const data = {
      user_name: username,
      email: maile,
      password: password
    };
    axios
      .post(add_ins_url, data, config)
      .then((ret) => {
        setOpen(false);
        setisComponentUpdate(!isComponentUpdate);
        const title = 'Success!';
        const html = 'New instructor account created!';
        const timer = 3500;
        const icon = 'success';
        swal2Timing(title, html, timer, icon);
        return;
      })
      .catch((er) => {
        setOpen(false);
        setisComponentUpdate(!isComponentUpdate);

        const title = 'Error!';
        const html = 'Something broke!';
        const timer = 2500;
        const icon = 'error';
        swal2Timing(title, html, timer, icon);
        return;
      });
  };

  React.useEffect(() => {}, [open]);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id='simple-modal-title'>Create new instructor account</h2>
      <form onSubmit={handleAddIns} onKeyPress={handleKeyPress}>
        <p id='simple-modal-description'>
          <FormControl fullWidth>
            <TextField
              fullWidth
              id='username'
              onChange={handleUsernameChange}
              value={username}
              label='Username'
              name='username'
            />
          </FormControl>
        </p>

        <p id='simple-modal-description'>
          <FormControl fullWidth>
            <TextField
              fullWidth
              id='catValue'
              type='email'
              onChange={handleMaileChange}
              value={maile}
              label='Email'
              name='catValue'
            />
          </FormControl>
        </p>
        <p id='simple-modal-description'>
          <FormControl fullWidth>
            <TextField
              fullWidth
              id='password'
              type='password'
              onChange={handlePassworChange}
              value={password}
              label='Password'
              name='username'
            />
          </FormControl>
        </p>
        <p id='simple-modal-description'>
          <Button
            type='submit'
            onClick={handleAddIns}
            variant='contained'
            color='primary'
          >
            Create
          </Button>
        </p>
      </form>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </div>
  );
}
