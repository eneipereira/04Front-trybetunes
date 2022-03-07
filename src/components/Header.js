import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
          <>
            <p data-testid="header-user-name">{ name }</p>
            <nav>
              <Link data-testid="link-to-search" to="/search">Search</Link>
              <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
              <Link data-testid="link-to-profile" to="/profile">Profile</Link>
            </nav>
          </>
        )}
      </header>
    );
  }
}

export default Header;
