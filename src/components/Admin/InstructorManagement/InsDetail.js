import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import cn from 'classnames';
import React from 'react';
import Moment from 'react-moment';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as env from '../../../config/env.config';

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
export default function InstructorDetail() {
  const classes = useStyles();
  const { id } = useParams();
  const config = [];
  const [ins_detail, set_ins_detail] = React.useState({});

  const [prevPath, setprevPath] = React.useState('');

  const history = useHistory();

  function getInstructorDetail() {
    const sub_detail_url = `${env.DEV_URL}/api/instructor/${id}`;
    axios.get(sub_detail_url, config).then((ret) => {
      set_ins_detail(ret.data.instructor_detail);
    });
  }

  React.useEffect(() => {
    getInstructorDetail();
  }, []);

  return (
    <Box>
      <Typography variant='h5'>Instructor detail</Typography>

      <Box my={2}>
        <Typography variant='h6'>
          Instructor id: {ins_detail.user_id}{' '}
        </Typography>

        <Typography variant='h6'>
          Instructor name: {ins_detail.user_name}{' '}
        </Typography>

        <Typography variant='h6'>Email: {ins_detail.email} </Typography>

        <Typography variant='h6'>Password: {ins_detail.password} </Typography>
        <Typography variant='h6'>
          Date of birth:
          <Moment format='MM/DD/YYYY'>{ins_detail.date_of_birth}</Moment>
        </Typography>
        <Typography variant='h6'>
          Is verified: {ins_detail.is_verified}{' '}
        </Typography>
        <Typography variant='h6'>
          OTP verify URL: {ins_detail.otp_verify_url}{' '}
        </Typography>
        <Typography variant='h6'>Role ID: {ins_detail.role_id} </Typography>
      </Box>
      <Link
        to='/admin/instructor-management'
        className={cn(classes.link, classes.my12)}
      >
        <Button className={cn(classes.link, classes.my12)} variant='contained'>
          Back
        </Button>
      </Link>
    </Box>
  );
}
