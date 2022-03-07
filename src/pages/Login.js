import React, { Component } from 'react';
// import { createUser } from '../services/userAPI';

class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="loginName">
            <input
              name="loginName"
              id="loginName"
              data-testid="login-name-input"
              placeholder="Insira um nome..."
            />
          </label>
          <button
            name="loginBtn"
            type="submit"
            data-testid="login-submit-button"
            // disabled={ }
            // onClick={ }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
