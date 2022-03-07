import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    this.recoveryUser();
  }

  recoveryUser = async () => {
    this.setState({ user: await getUser() });
  }

  render() {
    const { user: { name } } = this.state;
    return (
      <header data-testid="header-component">
        {!name ? <Loading /> : (
          <p data-testid="header-user-name">{ name }</p>
        )}
      </header>
    );
  }
}

export default Header;
