import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  func, bool, object, oneOfType, string,
} from 'prop-types';
import Header from '<src>/components/UI/Header';
import Spinner from '<src>/components/UI/Spinner';
import Background from '<src>/components/UI/Background';
import { registerAction, processingRequest } from '<redux>/actions/authActions';

/**
 * @class SignUp
 * @description SignUp component
 * @param {object} event - Synthetic event object
 */
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitForm = (event) => {
    event.preventDefault();

    const { register, displayLoader } = this.props;
    displayLoader();
    const {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
    } = this.state;

    const user = {
      email,
      firstName,
      lastName,
      password,
    };
    register(password, confirmPassword, user);
  };

  /**
   * @method render
   * @description React render method
   * @returns {JSX} React component
   */
  render() {
    const { isLoggedIn, isLoading, errors } = this.props;
    return (
      <>
        {isLoggedIn && <Redirect to="./dashboard" />}
        <Header />
        <Background animate={true}>
          <>
            <h1>Sign Up</h1>
            {errors && (
              <div className="errorDiv">
                <pre>{errors.error}</pre>
              </div>
            )}
            <form onSubmit={this.submitForm} className="form">
              <input
                onChange={this.onChange}
                type="text"
                name="firstName"
                placeholder="First Name"
                required
              />
              <input
                onChange={this.onChange}
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
              />
              <input
                onChange={this.onChange}
                type="text"
                name="email"
                placeholder="Email"
                required
              />
              <input
                onChange={this.onChange}
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <input
                onChange={this.onChange}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
              />
              <button type="submit">
                {isLoading ? <Spinner /> : 'Sign Up'}
              </button>
            </form>
          </>
        </Background>
      </>
    );
  }
}

// export default SignUp;

/**
 * @method mapDispatchToProps
 * @description maps redux actions to props
 * @param {callback} dispatch destructured reducer state object
 * @returns {object} state
 */
export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    register: registerAction,
    displayLoader: processingRequest,
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
  const { isLoggedIn, isLoading, errors } = auth;
  return { isLoggedIn, isLoading, errors };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);

SignUp.propTypes = {
  register: func.isRequired,
  displayLoader: func.isRequired,
  isLoggedIn: bool.isRequired,
  isLoading: bool.isRequired,
  errors: oneOfType([string, object]).isRequired,
};
