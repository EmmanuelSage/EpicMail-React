import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '<src>/components/UI/Header';
import Spinner from '<src>/components/UI/Spinner';
import Background from '<src>/components/UI/Background';
import { setCookie } from '<helpers>/auth';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false,
      errors: null,
      isLoading: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    fetch('https://esepicmail.herokuapp.com/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((data) => {
        if (data.status === 200) {
          setCookie('token', data.data[0].token, 1);
          this.setState({ isLoggedIn: true });
        } else if (data.status === 400) {
          this.setState({ errors: data, isLoading: false });
        }
      })
      .catch(() => {
        const errorMessage = {
          error: 'An error occured',
        };
        this.setState({ errors: errorMessage, isLoading: false });
      });
  };

  render() {
    const { isLoading, isLoggedIn } = this.state;
    return (
      <>
        {isLoggedIn && <Redirect to="./dashboard" />}
        <Header />
        <Background animate={true}>
          <>
            <h1>Sign in </h1>
            {this.state.errors && (
              <div className="errorDiv">
                <pre>{this.state.errors.error}</pre>
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

export default SignIn;
