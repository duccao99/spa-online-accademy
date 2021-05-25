import { Box, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as env from "../../config/env.config";
const common_spacing = 32;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fafafa",
    height: "95vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    marginTop: 12,
  },
}));

export default function Verify() {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();

  const handleVerify = (e) => {
    const verify_url = `${env.DEV_URL}/api/user/access-link-otp/${id}`;
    const config = {};
    axios
      .get(verify_url, config)
      .then((ret) => {
        if (+ret.data.verify_status.affectedRows === 1) {
          window.close();
        } else {
          window.close();
        }
      })
      .catch((er) => {
        window.close();
      });
  };
  useEffect(() => {
    console.log(id);
    console.log(history);
  }, []);
  return (
    <Box className={classes.root}>
      <Typography variant="h5">Verify your account!</Typography>
      <Button
        className={classes.btn}
        variant="contained"
        onClick={handleVerify}
      >
        Verify
      </Button>
    </Box>
  );
}
