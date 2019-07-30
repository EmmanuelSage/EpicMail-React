import React from 'react';
import { bool, element } from 'prop-types';

const Background = ({ children, animate, dashboard }) => (
  <>
    <div className={`animation-wrapper  ${(dashboard ? 'dash-margin' : '')}`}>
      <div className={(!dashboard ? 'form-container' : '')}>{children}</div>
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
  dashboard: bool,
};

export default Background;
