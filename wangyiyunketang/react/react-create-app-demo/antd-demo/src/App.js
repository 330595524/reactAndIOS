import React from 'react';

import './App.css';
import Home from './router/home/Home'
import About from './router/home/About'
import Myechartsvg from './router/Myechartsvg/Myechartsvg';
import FormComponent from './component/form/FormComponent'
import UiComponent from './component/form/uiComponent/UiComponent'
import Confirm from './component/Confirm/Confirm'
function App() {
  return (
    <div className="App">
      <header className="App-header">
      
        {/* <Myechartsvg/> */}
        {/* <Home/> */}
        {/* <About/> */}
        {/* <FormComponent/> */}
        {/* <UiComponent/> */}
        <Confirm/> 
      </header>
    </div>
  );
}

export default App;
