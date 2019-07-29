import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  func, bool, object, oneOfType, string,
} from 'prop-types';
import Header from '<src>/components/UI/Header';
import Spinner from '<src>/components/UI/Spinner';
import Background from '<src>/components/UI/Background';
import { loginAction, processingRequest } from '<redux>/actions/authActions';

/**
 * @class SignIn
 * @description SignIn component
 * @param {object} event - Synthetic event object
 */
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { login, displayLoader } = this.props;
    displayLoader();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    login(user);
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
            <h1>Sign in </h1>
            {errors && (
              <div className="errorDiv">
                <pre>{errors.error}</pre>
              </div>
            )}
            <form onSubmit={this.submitForm} className="form">
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
              <div className="reset-password">
                <Link to="/signin">Reset Password ?</Link>
              </div>
              <button type="submit">
                {isLoading ? <Spinner /> : 'Sign in'}
              </button>
            </form>
          </>
        </Background>
      </>
    );
  }
}

/**
 * @method mapDispatchToProps
 * @description maps redux actions to props
 * @param {callback} dispatch destructured reducer state object
 * @returns {object} state
 */
export const mapDispatchToProps = dispatch => bindActionCreators(
  {
    login: loginAction,
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
)(SignIn);

SignIn.propTypes = {
  login: func.isRequired,
  displayLoader: func.isRequired,
  isLoggedIn: bool.isRequired,
  isLoading: bool.isRequired,
  errors: oneOfType([string, object]).isRequired,
};
