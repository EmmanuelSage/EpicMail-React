import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <>
    <header>
      <div id="branding">
        <NavLink activeClassName="current" exact to="/">
          <h1> EPIC MAIL</h1>
        </NavLink>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName="current" to="/signin">Sign in</NavLink>
          </li>
          <li>
            <NavLink activeClassName="current" to="/signup">Sign Up</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  </>
);

export default Header;
