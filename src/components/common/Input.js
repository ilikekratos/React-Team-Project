import React from 'react';
import {TextField} from '@mui/material';
import {useField} from 'formik';

const Input = ({name, ...rest}) => {
  const [field, {touched, error}] = useField(name);

  return (
    <TextField
      error={error || false}
      {...field}
      {...rest}
    />
  );
}

export {Input};
