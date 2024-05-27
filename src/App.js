import React from 'react';
import ComponentWithUseReducer from './components/ComponentWithUseReducer';
import BasicReducer from "./components/BasicReducer"

function App() {

  return (
    <div className="App">
      <BasicReducer />
      <ComponentWithUseReducer />
    </div>
  )
}

export default App;
