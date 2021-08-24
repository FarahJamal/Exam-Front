import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from './components/LogoutButton';
import LoginButton from './components/LoginButton';
import FavFlowers from './components/FavFlowers';
import Home from './components/Home';


class App extends React.Component {

  render() {
    console.log('app', this.props);
    const { isAuthenticated } = this.props.auth0;
    return(
      <>
        <Router>
            <Header />
            <Switch>
              <Route exact path="/">
              {isAuthenticated ? <><LogoutButton/> <Home/></>:<LoginButton/>}
              </Route>
              <Route exact path="/favFlowers">
              </Route>
            </Switch>
            <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
