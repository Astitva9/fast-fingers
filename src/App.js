import React from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";
import Routes from './Routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {


  return (
    <Router>
      <Routes/>
      <ToastContainer />
    </Router>
  );
}

export default App;
