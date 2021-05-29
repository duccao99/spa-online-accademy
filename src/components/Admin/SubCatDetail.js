import { Box, Button, makeStyles, Typography } from '@material-ui/core';
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
    axios.get(sub_detail_url, config).then((ret) => {
      setSubDetail(ret.data.sub_cat_detail);
    });
  }

  React.useEffect(() => {
    console.log(history);
    getSubCatDetail();
  }, []);

  return (
    <Box>
      <Typography variant='h5'>Sub category detail</Typography>

      <Box my={2}>
        <Typography variant='h6'>
          Sub category id: {subDetail.subject_id}{' '}
        </Typography>

        <Typography variant='h6'>
          Sub category name: {subDetail.subject_name}{' '}
        </Typography>

        <Typography variant='h6'>Category id: {subDetail.cat_id} </Typography>
        <Typography variant='h6'>
          Category name: {subDetail.cat_name}{' '}
        </Typography>
      </Box>
      <Link
        to='/admin/cat-management'
        className={cn(classes.link, classes.my12)}
      >
        <Button className={cn(classes.link, classes.my12)} variant='contained'>
          Back
        </Button>
      </Link>
    </Box>
  );
}
