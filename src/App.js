import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import Home from "./Home";
import CreateTask from "./CreateTask";
import "./App.css";
import { StateProvider } from "./Context";
import ErrorBoundary from "./ErrorBoundary";
import CreateForm from "./CreateForm";
import Form from "./Form";
import CreateUser from "./CreateUser";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";

function App() {
  return (
    <ErrorBoundary>
      <StateProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/createtask" component={CreateTask} />
            <Route exact path="/createform" component={CreateForm} />
            <Route exact path="/form" component={Form} />
            <Route exact path="/adduser" component={CreateUser} />
            <Route exact path='/profile' component={Profile}/>
            <Route exact path='/changepass' component={ChangePassword}/>
            <PrivateRoute></PrivateRoute>
          </Switch>
        </BrowserRouter>
      </StateProvider>
    </ErrorBoundary>
  );
}

export default App;
