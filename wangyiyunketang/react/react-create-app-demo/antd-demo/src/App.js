import React from 'react';

import './App.css';
import Home from './router/home/Home'
import FormComponent from './component/form/FormComponent'
function App() {
  return (
    <div className="App">
      <header className="App-header">
      
        <Home/>
        <FormComponent/>
      </header>
    </div>
  );
}

export default App;
