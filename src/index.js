import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Landing from './components/pages/landing';

const App = () => {
  return <>
<Landing/>
  </>;
};

ReactDOM.render(<App />, document.getElementById('app'));
