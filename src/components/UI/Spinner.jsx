import React from 'react';
import { bool } from 'prop-types';
import loading from '../../assets/img/loading.png';

const Spinner = ({ message }) => {
  let spinnersize = '15px';
  if (message === true) spinnersize = '30px';

  const style = {
    width: spinnersize,
    height: spinnersize,
  };
  return <img style={style} src={loading} />;
};

export default Spinner;

Spinner.propTypes = {
  message: bool,
};
