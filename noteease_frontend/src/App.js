import React from 'react';
import './App.css';
import MainContainer from './components/MainContainer/MainContainer'; // Will be created next

// PUBLIC_INTERFACE
/**
 * The main application component.
 * It sets up the overall structure and renders the MainContainer.
 */
function App() {
  return (
    <div className="app">
      <MainContainer />
    </div>
  );
}

export default App;