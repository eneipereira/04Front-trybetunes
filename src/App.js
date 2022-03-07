import React from 'react';
import { BrowserRouter, Switch, Route/* , Link */ } from 'react-router-dom';
import { Login, Search, Album, Favorites, Profile, ProfileEdit, NotFound } from './pages';
import DefLayout from './components/DefLayout';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/album/:id"
            render={ (props) => (
              <DefLayout>
                <Album { ...props } />
              </DefLayout>
            ) }
          />
          <Route
            path="/profile/edit"
            render={ (props) => (
              <DefLayout>
                <ProfileEdit { ...props } />
              </DefLayout>
            ) }
          />
          <Route
            path="/profile"
            render={ (props) => (
              <DefLayout>
                <Profile { ...props } />
              </DefLayout>
            ) }
          />
          <Route
            path="/search"
            render={ (props) => (
              <DefLayout>
                <Search { ...props } />
              </DefLayout>
            ) }
          />
          <Route
            path="/favorites"
            render={ (props) => (
              <DefLayout>
                <Favorites { ...props } />
              </DefLayout>
            ) }
          />
          <Route exact path="/" component={ Login } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
