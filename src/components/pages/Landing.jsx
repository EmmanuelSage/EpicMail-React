import React from 'react';
import { Link } from 'react-router-dom';
import Header from '<src>/components/UI/Header';
import Background from '<src>/components/UI/Background';

const Landing = () => (
  <>
    <Header />
    <Background animate={true}>
      <form className="form">
        <div className="welcome-message options">
          <h1>Welcome to Epic Mail</h1>
          <p className="padding"> Messaging made easy. </p>
          <Link to="/signin">
            <div>Sign In</div>
          </Link>
          <Link to="/signup">
            <div>Sign Up</div>
          </Link>
        </div>
      </form>
    </Background>
  </>
);

export default Landing;
