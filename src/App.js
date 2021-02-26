import React,{useEffect,useState} from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";
import Routes from './Routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  const [isLoggedIn,setIsLoggedIn] = useState(false);

  useEffect(() => {
      const loggedInUser = localStorage.getItem("token");
      if (loggedInUser) {
          setIsLoggedIn(true);
      }
  }, []);
  return (
    <Router>
      <Routes isLoggedIn={isLoggedIn}/>
      <ToastContainer />
    </Router>
  );
}

export default App;
