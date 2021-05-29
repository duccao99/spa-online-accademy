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

export default function AddSubCatModal({ open, setOpen }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [value, setValue] = React.useState('');
  const [catValue, setCatValue] = React.useState('');
  const config = {};
  // const [open, setOpen] = React.useState(false);
  const handleClose = (e) => {
    setOpen(false);
  };

  const handleCatVlChange = (e) => {
    setCatValue(e.target.value);
  };
  const handleSubCatNameChange = (e) => {
    setValue(e.target.value);
  };
  const handleAddSubCat = (e, name) => {
    e.preventDefault();

    const url = `${env.DEV_URL}/api/sub-category/`;
    const data = {
      subject_name: `${value}`,
      cat_id: +catValue
    };
    axios
      .post(url, data, config)
      .then((ret) => {
        setOpen(false);
        const title = 'Success!';
        const html = 'Added new sub category!';
        const timer = 3500;
        const icon = 'success';
        swal2Timing(title, html, timer, icon);
        return;
      })
      .catch((er) => {
        setOpen(false);

        const title = 'Error!';
        const html = 'Something broke!';
        const timer = 2500;
        const icon = 'error';
        swal2Timing(title, html, timer, icon);
        return;
      });
  };
  const handleKeyPress = (e) => {
    if (e.which === 13) {
      handleAddSubCat(e);
    }
  };

  React.useEffect(() => {}, [open]);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id='simple-modal-title'>Adding new sub category</h2>
      <form onSubmit={handleAddSubCat} onKeyPress={handleKeyPress}>
        <p id='simple-modal-description'>
          <FormControl fullWidth>
            <TextField
              fullWidth
              id='txtSubCatName'
              onChange={handleSubCatNameChange}
              value={value}
              label='Sub category name'
              name='txtSubCatName'
            />
          </FormControl>
        </p>
        <p id='simple-modal-description'>
          <FormControl fullWidth>
            <TextField
              fullWidth
              id='catValue'
              onChange={handleCatVlChange}
              value={catValue}
              label='Category ID'
              name='catValue'
            />
          </FormControl>
        </p>
        <p id='simple-modal-description'>
          <Button
            type='submit'
            onClick={handleAddSubCat}
            variant='contained'
            color='primary'
          >
            Add
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
