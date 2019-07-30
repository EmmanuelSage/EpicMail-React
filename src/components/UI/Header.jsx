import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { bool, func } from 'prop-types';
import { logOut } from '<redux>/actions/authActions';

const Header = ({ dashboard, logOutMethod }) => {
  const logOutFn = () => {
    logOutMethod();
  };

  return (
    <>
      <header>
        <div id="branding">
          <NavLink activeClassName="current" exact to="/">
            <h1> EPIC MAIL</h1>
          </NavLink>
        </div>
        <nav>
          <ul>
            {dashboard ? (
              <>
                <li className="current">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li>
                  <Link onClick={logOutFn} id="logOut" to="/signin">
                    Log out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink activeClassName="current" to="/signin">
                    Sign in
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="current" to="/signup">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

/**
 * @method mapDispatchToProps
 * @description maps redux actions to props
 * @param {callback} dispatch destructured reducer state object
 * @returns {object} state
 */
export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    logOutMethod: logOut,
  },
  dispatch,
);

/**
 * @method mapStateToProps
 * @description maps reducer states to props
 * @param {object} * destructured reducer state object
 * @returns {object} state
 */
export const mapStateToProps = ({ auth }) => {
  const { isMobileDevice, messages } = auth;
  return { isMobileDevice, messages };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

Header.propTypes = {
  isMobileDevice: bool,
  dashboard: bool,
  logOutMethod: func,
};
