import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Landing } from './components/layout/Landing';
import { Navbar } from './components/layout/Navbar';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
// Redux
import { Provider } from 'react-redux';
import store from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <section className='container'>
              <Switch>
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
              </Switch>
            </section>
          </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
