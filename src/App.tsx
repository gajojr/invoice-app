import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.less';

import HomePage from './pages/HomePages/HomePage.page';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/register">
            {/* <RegisterPage /> */}
            <div>Register Page</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
