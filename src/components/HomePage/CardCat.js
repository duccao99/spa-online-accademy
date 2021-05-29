import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function CardCat({ cat }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <TableRow hover>
      <TableCell component='th' scope='row'>
        {cat.cat_name}
      </TableCell>
      <TableCell align='right'>{cat.subject_name}</TableCell>
      <TableCell align='right'>{cat.num_student_enroll}</TableCell>
    </TableRow>
  );
}
