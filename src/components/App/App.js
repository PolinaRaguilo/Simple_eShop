import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Header from '../Header/Header';
import AdminPage from '../Views/AdminPage/AdminPage';
import ItemsPage from '../Views/ItemsPage/ItemsPage';
import LoginPage from '../Views/LoginPage/LoginPage';
import RegistrationPage from '../Views/RegistrationPage/RegistrationPage';
import UserPage from '../Views/UserPage/UserPage';
import Cart from '../Cart/Cart';

class App extends React.Component {
  state = {
    showAdmin: false,
  };

  toogle = () => {
    this.setState(state => ({
      showAdmin: !state.showAdmin,
    }));
  };

  render() {
    return (
      <>
        <BrowserRouter>
          <Header toogle={this.toogle} />
          <Route component={Cart} />
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/items" component={ItemsPage} />
            <PrivateRoute path="/admin" showAdmin={this.state.showAdmin} component={AdminPage} />
            <Route exact path="/user" component={UserPage} />
            <Route exact path="/registration" component={RegistrationPage} />
            <Route render={() => <h2>Page not found 404</h2>} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
