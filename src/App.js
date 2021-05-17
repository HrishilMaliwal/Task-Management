import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute'
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <PrivateRoute>

        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
