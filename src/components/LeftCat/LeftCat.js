import React, { useState, useEffect } from "react";
import { makeStyles, Box } from "@material-ui/core";
import axios from "axios";
import * as env from "../../config/env.config";
import Cat from "./Cat";

const style = makeStyles((theme) => ({
  left_cat_wrapper: {},
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const categories = [
  {
    cat_id: 1,
    cat_name: "Web development",
  },
  {
    cat_id: 2,
    cat_name: "Mobile development",
  },
];

export default function LeftCat() {
  const classes = style();
  const [all_subcat, set_all_subcat] = useState([]);

  useEffect(() => {
    const all_sub_cat_url = `${env.DEV_URL}/api/sub-category/`;
    const config = {};
    axios.get(all_sub_cat_url, config).then((ret) => {
      set_all_subcat(ret.data.all_sub_cats);
    });
  }, []);

  return (
    <Box>
      {categories.map((ele, i) => {
        return <Cat all_subcat={all_subcat} key={i} {...ele} />;
      })}
    </Box>
  );
}
