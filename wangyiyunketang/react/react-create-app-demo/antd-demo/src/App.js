import React from 'react';

import './App.css';
import Home from './router/home/Home'
import About from './router/home/About'
import FormComponent from './component/form/FormComponent'
import UiComponent from './component/form/uiComponent/UiComponent'
function App() {
  return (
    <div className="App">
      <header className="App-header">
      
        <Home/>
        <About/>
        <FormComponent/>
        <UiComponent/>
        
      </header>
    </div>
  );
}

export default App;
