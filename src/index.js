import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import BaseRoute from './components/BaseRoute';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <BaseRoute />
      </BrowserRouter>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
