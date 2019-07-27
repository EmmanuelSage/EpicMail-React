import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '<src>/components/UI/Header';
import Spinner from '<src>/components/UI/Spinner';
import Background from '<src>/components/UI/Background';
import { setCookie } from '<helpers>/auth';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
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
    this.setState({ errors: null, isLoading: true });
    const {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
    } = this.state;

    if (password !== confirmPassword) {
      const errorMessage = {
        error: 'Password must equal Confirm Pasword',
      };
      this.setState({ errors: errorMessage, isLoading: false });
      return;
    }
    const user = {
      email,
      firstName,
      lastName,
      password,
    };

    fetch('https://esepicmail.herokuapp.com/api/v1/auth/signup', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((data) => {
        if (data.status === 201) {
          setCookie('token', data.data[0].token, 1);
          this.setState({ isLoggedIn: true });
        } else if (data.status === 400) {
          let errors = '';
          data.errors.forEach((ele) => {
            errors += `${ele.error} \n`;
          });
          this.setState({ errors: { error: errors }, isLoading: false });
        } else if (data.status === 409) {
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
            <h1>Sign Up</h1>
            {this.state.errors && (
              <div className="errorDiv">
                <pre>{this.state.errors.error}</pre>
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

export default SignUp;
