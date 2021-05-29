import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function BasicPagination({
  total_pagi_stuff,
  handlePagiChange,
  curr_page,
  set_curr_page
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        page={+curr_page}
        count={+total_pagi_stuff}
        onChange={handlePagiChange}
        color='primary'
      />
    </div>
  );
}
