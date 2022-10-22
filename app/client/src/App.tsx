import React from 'react';
import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { RoutesContainer } from './components/RoutesContainer';

function App() {
  return (
    <div className="App">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* <Counter /> */}
      {/*<InitialMountContainer />*/}
      <RoutesContainer />
    </div>
  );
}

export default App;
