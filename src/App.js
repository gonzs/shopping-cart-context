import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Products from './Products/Products';
import Cart from './Cart/Cart';
import NavBar from './NavBar';
import store from './Store';
import { Provider } from 'react-redux';
import { fetchProductsIfNeeded } from './Actions';

class App extends Component {
  componentDidMount() {
    store.dispatch(fetchProductsIfNeeded(store.getState().selectCategory));
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route path="/products" component={Products} exact />
            <Route path="/checkout" component={Cart} exact />
            <Redirect from="" to="/products" />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
