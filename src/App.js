import React from 'react';
import { BrowserRouter, Switch, Route/* , Link */ } from 'react-router-dom';
import { Login, Search, Album, Favorites, Profile, ProfileEdit, NotFound } from './pages';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/album/:id" component={ Album } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/search" component={ Search } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/" component={ Login } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
