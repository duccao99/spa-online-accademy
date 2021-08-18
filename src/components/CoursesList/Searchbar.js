/* eslint-disable no-use-before-define */
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';

export default function Searchbar({
  all_courses,
  search_value,
  set_search_value
}) {
  const [all_courses_filter, set_all_courses_filter] = useState([]);
  useEffect(() => {
    set_all_courses_filter(all_courses);
  }, []);
  const handleSearchChange = (e) => {
    debounce(() => {
      set_search_value(e.target.value);
    }, 800)();
  };
  return (
    <div style={{ width: '100%' }}>
      <Autocomplete
        id='free-solo-demo'
        freeSolo
        options={all_courses_filter.map((option) => option.course_name)}
        renderInput={(params) => (
          <TextField
            {...params}
            value={search_value}
            onChange={handleSearchChange}
            label='Course name'
            margin='normal'
            variant='outlined'
          />
        )}
      />
    </div>
  );
}
