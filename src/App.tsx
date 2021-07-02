import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.less';

import HomePage from './pages/HomePages/HomePage.page';
import RegisterPage from './pages/RegisterPage/RegisterPage.page';
import ProfilePage from './pages/ProfilePage/ProfilePage.component';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/log-in">
          {/* <LoginPage /> */}
          <div>Log In Page</div>
        </Route>
        <Route path="/profile-page">
          <ProfilePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
