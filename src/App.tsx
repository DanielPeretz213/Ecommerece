import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppLAS from './Login-And-Shoping/AppLAS';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <AppLAS />
    </div>
  );
}

export default App;
