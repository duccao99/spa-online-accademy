import { FormControlLabel, withStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import * as env from '../../config/env.config';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120
  },
  selectEmpty: {}
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})((props) => <Checkbox color='default' {...props} />);

export default function RowExistsLesson({ row }) {
  const classes = useStyles();

  const [checked, setChecked] = useState(row.flag_reviewable);

  const handleChangeCheck = (e) => {
    setChecked(e.target.checked);

    const url = `${env.DEV_URL}/api/instructor/toggle-preview`;
    const data = {
      flag_reviewable: e.target.checked,
      lesson_id: +row.lesson_id
    };

    axios
      .patch(url, data, {})
      .then((ret) => {})
      .catch((er) => {});
  };
  useEffect(() => {}, []);

  return (
    <TableRow hover>
      <TableCell align='left' component='th' scope='row'>
        {row.lesson_id}
      </TableCell>
      <TableCell align='left'>{row.lesson_name}</TableCell>

      <TableCell align='left'>
        <FormControlLabel
          className={classes.checkbox}
          control={
            <GreenCheckbox
              checked={checked}
              onChange={handleChangeCheck}
              name='checkedG'
            />
          }
        />
      </TableCell>
      <TableCell align='left'>{row.chap_id}</TableCell>

      <TableCell align='left'>{row.chap_name}</TableCell>
    </TableRow>
  );
}
