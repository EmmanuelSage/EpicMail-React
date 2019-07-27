import React from 'react';

const style = {
  width: '15px',
  height: '15px',
};
// eslint-disable-next-line
const Spinner = () => <img style={style} src={require('../../assets/img/loading.png')}/>;

export default Spinner;
