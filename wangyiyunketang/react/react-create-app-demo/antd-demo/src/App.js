import React from 'react';
//引入一些模块
import { HashRouter as Router, Route, Link} from "react-router-dom";


import Home from './router/home/Home'
import About from './router/home/About'
import ComponentCycteTime from './router/HookAndNewComponent/ComponentCycteTime'
import Myechartsvg from './router/Myechartsvg/Myechartsvg';
import FormComponent from './component/form/FormComponent'
import UiComponent from './component/form/uiComponent/UiComponent'
import Confirm from './component/Confirm/Confirm'

import './App.css';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      
        {/* <Myechartsvg/> */}
        {/* <Home/> */}
        {/* <About/> */}
        {/* <FormComponent/> */}
        {/* <UiComponent/> */}


        <Router>
          <div className="App">
            <Link to="/">Home</Link>
            <Link to="/confirm">confirm</Link>
            <Link to="/cc">Product</Link>
            <hr/>
            <Route path="/confirm" component={Confirm}></Route>
            <Route path="/cc" component={ComponentCycteTime}></Route>
          </div>
        </Router>

      </header>
    </div>
  );
}

export default App;
