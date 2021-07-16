import { lazy, Suspense } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.less';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.page'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage.page'));
const LogInPage = lazy(() => import('./pages/LogInPage/LogInPage.page'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage.page'));
const InvoicePage = lazy(() => import('./pages/InvoicePage/InvoicePage.page'));
const CreateInvoicePage = lazy(() => import('./pages/CreateInvoicePage/CreateInvoicePage.page'));
const UpdateInvoicePage = lazy(() => import('./pages/UpdateInvoicePage/UpdateInvoicePage.page'));
const AdminPage = lazy(() => import('./pages/AdminPage/AdminPage.page'));

function App() {
  const fallbackComponent = () => <div>Loading...</div>;

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Suspense fallback={fallbackComponent}>
            <HomePage />
          </Suspense>
        </Route>
        <Route path="/register">
          <Suspense fallback={fallbackComponent}>
            <RegisterPage />
          </Suspense>
        </Route>
        <Route path="/log-in">
          <Suspense fallback={fallbackComponent}>
            <LogInPage />
          </Suspense>
        </Route>
        <Route path="/profile-page">
          <Suspense fallback={fallbackComponent}>
            <ProfilePage />
          </Suspense>
        </Route>
        <Route path="/invoices/:id">
          <Suspense fallback={fallbackComponent}>
            <InvoicePage />
          </Suspense>
        </Route>
        <Route path="/create-invoice">
          <Suspense fallback={fallbackComponent}>
            <CreateInvoicePage />
          </Suspense>
        </Route>
        <Route path="/update-invoice/:id">
          <Suspense fallback={fallbackComponent}>
            <UpdateInvoicePage />
          </Suspense>
        </Route>
        <Route path="/admin-page">
          <Suspense fallback={fallbackComponent}>
            <AdminPage />
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
