// App.js
import React from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="app-content">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
};

export default App;
