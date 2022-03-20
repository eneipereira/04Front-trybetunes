import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import { Loading } from '../components/index1';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: true,
      isMounted: false,
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true }, () => {
      this.getUserfromAPI();
    });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  getUserfromAPI = async () => {
    const { isMounted } = this.state;
    if (isMounted) {
      const user = await getUser();
      this.setState({ user, loading: false });
    }
  }

  render() {
    const { user: { name, email, image, description }, loading } = this.state;
    return (
      <div data-testid="page-profile">
        {loading ? <Loading /> : (
          <div>
            <div>
              <img
                data-testid="profile-image"
                src={ image }
                alt={ `Foto de perfil de: ${name}` }
              />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
            <div>
              <h4>Nome:</h4>
              <p>{name}</p>
            </div>
            <div>
              <h4>Email:</h4>
              <p>{email}</p>
            </div>
            <div>
              <h4>Description</h4>
              <p>{description}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
