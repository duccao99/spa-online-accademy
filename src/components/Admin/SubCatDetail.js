import {
  Box,
  Typography,
  Button,
  makeStyles,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  Paper
} from '@material-ui/core';
import axios from 'axios';
import cn from 'classnames';
import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as env from '../../config/env.config';

const useStyles = makeStyles({
  table: {
    width: '100%'
  },
  btn: {
    marginLeft: 12
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&:visited': {
      color: 'inherit',
      textDecoration: 'none'
    }
  },
  my12: {
    marginTop: 12,
    marginBottom: 12
  },
  cell_info: {
    fontWeight: '550 !important',
    fontSize: '16px !important'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
export default function SubCatDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const config = [];
  const [subDetail, setSubDetail] = React.useState({});
  const [prevPath, setprevPath] = React.useState('');

  const history = useHistory();

  function getSubCatDetail() {
    const sub_detail_url = `${env.DEV_URL}/api/sub-category/${id}`;
    axios
      .get(sub_detail_url, config)
      .then((ret) => {
        setSubDetail(ret.data.sub_cat_detail);
      })
      .catch((er) => {
        console.log(er.response);
      });
  }

  React.useEffect(() => {
    getSubCatDetail();
  }, []);

  return (
    <React.Fragment>
      <Box mb={3} className={classes.header}>
        <Box mb={3}>
          <Typography variant='h6'>Sub category detail</Typography>{' '}
        </Box>
        <Link
          to='/admin/cat-management'
          className={cn(classes.link, classes.my12)}
        >
          <Button
            className={cn(classes.link, classes.my12)}
            variant='contained'
          >
            Back
          </Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableRow>
            <TableCell variant='head'>Sub category id</TableCell>
            <TableCell className={classes.cell_info}>
              {subDetail.subject_id}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Sub category name</TableCell>
            <TableCell className={classes.cell_info}>
              {subDetail.subject_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Category id</TableCell>
            <TableCell className={classes.cell_info}>
              {subDetail.cat_id}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant='head'>Category name</TableCell>
            <TableCell className={classes.cell_info}>
              {subDetail.cat_name}
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
