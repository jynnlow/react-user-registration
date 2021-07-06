import React, {Component} from 'react';
import './App.css';
import Signin from './components/signin';
import Nav from './components/nav';
import Signup from './components/signup'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Page from './page';
//import Users from './components/table';

class App extends Component {
  render() { 
    return ( 
      <Router>
      <div className="App">
        <Switch>
          <Route path="/welcome" exact component={Signin}/>
          <React.Fragment>
            <Nav />
            <div className="container-fluid"> 
              <div className="container">
                <Route path="/" exact component={Signup}/>
                <Route path="/get-users" component={Page}></Route>
              </div>
            </div>
          </React.Fragment>
        </Switch>
      </div>
    </Router>
     );
  }
}
 
export default App;

