import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.less';

import HomePage from './pages/HomePages/HomePage.page';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/register">
          {/* <RegisterPage /> */}
          <div>Register Page</div>
        </Route>
        <Route path="/log-in">
          {/* <LoginPage /> */}
          <div>Log In Page</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
