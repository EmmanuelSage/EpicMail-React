import React from 'react';
import { bool, element } from 'prop-types';

const Background = ({ children, animate }) => (
  <>
    <div className="animation-wrapper">
      <div className="form-container">{children}</div>
      {animate && (
        <ul className="epicmails">
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
      )}
    </div>
  </>
);

Background.propTypes = {
  children: element.isRequired,
  animate: bool.isRequired,
};

export default Background;
