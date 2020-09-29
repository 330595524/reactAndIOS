import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import PersonnelOriginator from './routers/medicine/pages/PersonnelOriginator/PersonnelOriginator';
import LeaderApprover from './routers/medicine/pages/LeaderApprover/LeaderApprover';
// eslint-disable-next-line
import './App.less';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <div>
          <Router>
            <ul className="nav">
              <li><Link to="/originator">发起</Link></li>
              <li><Link to="/approver">审批</Link></li>
            </ul>
            <hr />
            <Route exact path="/originator" component={PersonnelOriginator} />
            <Route path="/approver" component={LeaderApprover} />
          </Router>
        </div>
      </div>
    )
  }
}

export default App;
