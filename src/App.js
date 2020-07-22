import React from 'react';
import './App.css';
import Login from './components/Login';
import ProtectedRoute from './components/protectedRoute';
// import Toast from './components/ToastMessage';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
//   const testList = [
//     {
//       id: 1,
//       title: 'Success',
//       description: 'This is a success toast component',
//       backgroundColor: '#5cb85c',
//       // icon: checkIcon
//     },
//     {
//       id: 2,
//       title: 'Danger',
//       description: 'This is an error toast component',
//       backgroundColor: '#d9534f',
//       // icon: errorIcon
//     },
// ];
  return (
    <div className="App">
       <Router>
        <Switch>
          <Route exact path="/">
            <ProtectedRoute/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
        </Switch>
       </Router>
       {/* <Toast toastList={testList}
              position="bottom-left" /> */}
    </div>
  );
}

export default App;
