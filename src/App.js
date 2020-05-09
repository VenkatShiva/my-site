import React from 'react';
import './App.css';
import Login from './components/Login';
import ProtectedRoute from './components/protectedRoute';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
       <Router>
        <Switch>
          <Route exact path="/">
            <ProtectedRoute/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>``
        </Switch>
       </Router>
    </div>
  );
}

export default App;
