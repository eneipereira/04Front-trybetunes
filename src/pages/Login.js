import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

const MIN_LENGTH = 3;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isBtnDisabled: true,
      isBtnClicked: false,
      isUserCreated: false,
      isMounted: false,
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  handleChange = ({ target: { value } }) => {
    const INPUT_LENGTH = value.length;
    this.setState({
      name: value,
      isBtnDisabled: INPUT_LENGTH < MIN_LENGTH,
    });
  }

  handleClick = async (e) => {
    e.preventDefault();
    const { name, isMounted } = this.state;
    if (isMounted) {
      this.setState({ isBtnClicked: true });
      await createUser({ name });
      this.setState({ isUserCreated: true });
    }
  }

  render() {
    const { name, isBtnDisabled, isBtnClicked, isUserCreated } = this.state;
    const loading = isBtnClicked && !isUserCreated;
    const redirect = isBtnClicked && isUserCreated;
    return (
      <>
        {loading ? <Loading /> : (
          <div data-testid="page-login">
            <form onSubmit={ this.handleClick }>
              <label htmlFor="loginName">
                <input
                  name="loginName"
                  id="loginName"
                  data-testid="login-name-input"
                  placeholder="Insira o seu nome..."
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                name="loginBtn"
                type="submit"
                data-testid="login-submit-button"
                disabled={ isBtnDisabled }
              >
                Entrar
              </button>
            </form>
          </div>
        )}
        {redirect && <Redirect to="/search" />}
      </>
    );
  }
}

export default Login;
