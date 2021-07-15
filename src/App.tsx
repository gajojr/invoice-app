import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.less';

import HomePage from './pages/HomePage/HomePage.page';
import RegisterPage from './pages/RegisterPage/RegisterPage.page';
import LogInPage from './pages/LogInPage/LogInPage.page';
import ProfilePage from './pages/ProfilePage/ProfilePage.page';
import InvoicePage from './pages/InvoicePage/InvoicePage.page';
import CreateInvoicePage from './pages/CreateInvoicePage/CreateInvoicePage.page';
import UpdateInvoicePage from './pages/UpdateInvoicePage/UpdateInvoicePage.page';
import AdminPage from './pages/AdminPage/AdminPage.page';

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
        <Route path="/create-invoice">
          <CreateInvoicePage />
        </Route>
        <Route path="/update-invoice/:id">
          <UpdateInvoicePage />
        </Route>
        <Route path="/admin-page">
          <AdminPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
