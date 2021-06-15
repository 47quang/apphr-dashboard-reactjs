import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/css/app.css';
import './styles/scss/style.scss';

const Login = React.lazy(() => import('src/pages/login/Login'));
const Page404 = React.lazy(() => import('src/pages/page404/Page404'));
// const Page500 = React.lazy(() => import('src/pages/page500/Page500'));
const TheLayout = React.lazy(() => import('src/layouts/TheLayout'));

const App = () => {
  return (
    <Switch>
      <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
      <Route path="/not-found" name="Page 404" render={(props) => <Page404 {...props} />} />
      {/* <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} /> */}
      <Route path="/" name="Home" render={(props) => <TheLayout {...props} />} />
      <Route path="*" render={(props) => <Page404 {...props} />} />
    </Switch>
  );
};

export default App;
