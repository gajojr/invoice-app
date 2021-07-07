import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.less';

import HomePage from './pages/HomePages/HomePage.page';
import RegisterPage from './pages/RegisterPage/RegisterPage.page';
import LogInPage from './pages/LogInPage/LogInPage.page';
import ProfilePage from './pages/ProfilePage/ProfilePage.page';
import InvoicePage from './pages/InvoicePage/InvoicePage.page'

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
          <LogInPage />
        </Route>
        <Route path="/profile-page">
          <ProfilePage />
        </Route>
        <Route path="/invoices/:id">
          <InvoicePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
